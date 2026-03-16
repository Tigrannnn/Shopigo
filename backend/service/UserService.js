const { User, Token } = require('../models')
const ApiError = require('../exceptions/ApiError')
const TokenService = require('./TokenService')
const UserDto = require('../dtos/userDto')
const MailService = require('./MailService')
const redis = require('../db/redis')
const { Op } = require('sequelize')
const { OAuth2Client } = require('google-auth-library');

/**
 * Service for managing users (authentication, registration, profile)
 */
class UserService {
    /**
     * Send verification code to user's email
     * @param {Object} body - Request body with email
     * @returns {Promise<Object>} Email confirmation
     */
    async sendCode(body) {
        const { email } = body

        if (!email) {
            throw ApiError.BadRequest('Email is required');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw ApiError.BadRequest('Invalid email format');
        }

        // Check minimum interval between requests (60 seconds = 1 minute)
        const lastRequestKey = `last_request:${email}`;
        const lastRequestTime = await redis.get(lastRequestKey);
        if (lastRequestTime) {
            const timeSinceLastRequest = Date.now() - parseInt(lastRequestTime);
            const minInterval = 60 * 1000; // 60 seconds in milliseconds
            if (timeSinceLastRequest < minInterval) {
                const remainingSeconds = Math.ceil((minInterval - timeSinceLastRequest) / 1000);
                throw ApiError.BadRequest(`Please wait ${remainingSeconds} seconds before requesting a new code`);
            }
        }

        // Rate limiting: check if code is requested too frequently
        const rateLimitKey = `rate_limit:${email}`;
        const attempts = await redis.get(rateLimitKey);
        if (attempts && parseInt(attempts) >= 10) {
            const ttl = await redis.ttl(rateLimitKey);
            throw ApiError.BadRequest(`Too many requests. Please try again in ${Math.ceil(ttl / 60)} minutes`);
        }

        // Increment attempt counter
        if (attempts) {
            await redis.incr(rateLimitKey);
        } else {
            await redis.set(rateLimitKey, '1', 'EX', 3600); // 1 hour
        }

        // Save last request time
        await redis.set(lastRequestKey, Date.now().toString(), 'EX', 60); // Store for 60 seconds

        // Generate 6-digit verification code
        const serverCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save code to Redis with 10 minutes expiration
        await redis.set(`otp:${email}`, serverCode, 'EX', 600);

        await MailService.sendMail(email, serverCode);
        return { email }
    }

    /**
     * Login user with email and verification code
     * @param {Object} body - Request body with email and inputCode
     * @returns {Promise<Object>} Tokens and user data
     */
    async login(body) {
        const { email, inputCode } = body
        if (!email) {
            throw ApiError.BadRequest('Email is required')
        }
        if (!inputCode) {
            throw ApiError.BadRequest('Code is required')
        }

        // Brute force protection: check number of failed attempts
        const bruteForceKey = `brute_force:${email}`;
        const failedAttempts = await redis.get(bruteForceKey);
        if (failedAttempts && parseInt(failedAttempts) >= 10) {
            const ttl = await redis.ttl(bruteForceKey);
            throw ApiError.BadRequest(`Too many failed attempts. Please try again in ${Math.ceil(ttl / 60)} minutes`);
        }

        let user = await User.findOne({ where: { email } })

        // Get verification code from Redis
        const serverCode = await redis.get(`otp:${email}`)
        if (!serverCode) {
            throw ApiError.BadRequest('Code expired or not found')
        }

        if (String(serverCode) === String(inputCode)) {
            // Successful authorization - clear counters
            await redis.del(`otp:${email}`)
            await redis.del(bruteForceKey)
            await redis.del(`rate_limit:${email}`)

            // Create user if doesn't exist
            if (!user) {
                user = await User.create({ email, role: 'USER' })
            }
            const userDto = new UserDto(user)
            const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto })
            await TokenService.saveToken(userDto.id, refreshToken)
            return { accessToken, refreshToken, user }
        } else {
            // Failed attempt - increment counter
            if (failedAttempts) {
                await redis.incr(bruteForceKey);
            } else {
                await redis.set(bruteForceKey, '1', 'EX', 3600); // 1 hour
            }
            throw ApiError.BadRequest('Wrong code')
        }
    }

    /**
     * Authenticate user by ID and generate tokens
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Tokens and user data
     */
    async auth(userId) {
        const user = await User.findByPk(userId)
        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, refreshToken)
        return { accessToken, refreshToken, user }
    }

    /**
     * Login/register user via Google OAuth
     * @param {string} token - Google access token or ID token
     * @returns {Promise<Object>} Tokens and user data
     */
    async googleLogin(token) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        try {
            let email, name, googleId;

            // Check token type
            if (token.startsWith('ey')) {
                // This is ID token (JWT)
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });

                const payload = ticket.getPayload();
                ({ email, name, sub: googleId } = payload);
            } else {
                // This is access token, get user info from Google API
                const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to get user info from Google');
                }

                const userInfo = await response.json();
                console.log('Google userinfo response:', userInfo);

                email = userInfo.email;
                name = userInfo.name;
                googleId = userInfo.sub || userInfo.id;
            }

            if (!email) {
                throw ApiError.BadRequest('Email not provided by Google');
            }

            // Find or create user
            let user = await User.findOne({ where: { email } });

            if (!user) {
                // Create new user
                user = await User.create({
                    email,
                    name: name || null,
                    role: 'USER'
                });
            } else if (!user.name && name) {
                // Update name if it's missing
                user.name = name;
                await user.save();
            }

            const userDto = new UserDto(user);
            const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto });
            await TokenService.saveToken(userDto.id, refreshToken);

            return { accessToken, refreshToken, user };
        } catch (error) {
            console.error('Google auth error:', error.message);
            if (error.message.includes('Token used too early')) {
                throw ApiError.BadRequest('Invalid Google token');
            }
            throw ApiError.BadRequest('Google authentication failed');
        }
    }

    /**
     * Update user profile information
     * @param {string} userId - User ID
     * @param {Object} body - Updated user data
     * @returns {Promise<Object>} Updated user
     */
    async changeInfo(userId, body) {
        const { name } = body

        const user = await User.findByPk(userId)
        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        user.name = name
        await user.save()
        return user
    }

    /**
     * Toggle user role between ADMIN and USER
     * @param {string} id - User ID
     * @returns {Promise<Object>} Updated user
     */
    async changeRole(id) {
        if (!id) {
            throw ApiError.BadRequest('User Id is required')
        }

        const user = await User.findByPk(id)
        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        // Toggle role
        const role = user.role === 'ADMIN' ? 'USER' : 'ADMIN'

        user.role = role
        await user.save()
        return user
    }

    /**
     * Get all users with optional search filter
     * @param {Object} query - Query parameters (search, limit)
     * @returns {Promise<Array>} Array of users
     */
    async getUsers(query) {
        const { search, limit = 10 } = query
        let where = {}

        // Fuzzy search across email, name, and role
        if (search) {
            const cleanSearch = search.trim();

            const fuzzySearch = `%${cleanSearch
                .split(/[^\p{L}\p{N}]+/u)
                .filter(Boolean)
                .join('%')}%`;

            where[Op.or] = [
                { email: { [Op.iLike]: `${fuzzySearch}` } },
                { name: { [Op.iLike]: `${fuzzySearch}` } },
                { role: { [Op.iLike]: `${fuzzySearch}` } },
            ]
        }

        const users = await User.findAll({ where, limit, order: [['createdAt', 'DESC']] })
        return users
    }

    /**
     * Logout user and remove refresh token
     * @param {string} refreshToken - Refresh token to remove
     * @returns {Promise<Object>} Success message
     */
    async logout(refreshToken) {
        if (refreshToken) {
            await TokenService.removeToken(refreshToken)
        }
        return { message: 'Logged out' }
    }

    /**
     * Refresh access token using refresh token
     * @param {string} refreshToken - Refresh token
     * @returns {Promise<Object>} New access and refresh tokens
     */
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized('Refresh token is required')
        }

        // Use TokenService to validate token with proper error handling
        const userData = TokenService.validateRefreshToken(refreshToken)
        if(!userData) {
            throw ApiError.Unauthorized('Invalid refresh token')
        }

        // const tokenFromDb = await TokenService.findToken(refreshToken)
        // if (!tokenFromDb){
        //     throw ApiError.Unauthorized('Refresh token not found')
        // }

        const user = await User.findByPk(userData.id)
        if (!user) {
            throw ApiError.NotFound('User not found')
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({ ...userDto })

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        }
    }
}

module.exports = new UserService()