const jwt = require('jsonwebtoken')
const { Token } = require('../models')

/**
 * Service for managing JWT tokens (generation, validation, storage)
 */
class TokenService {
    /**
     * Generate access and refresh JWT tokens
     * @param {Object} payload - User data to encode in token
     * @returns {Object} Object containing accessToken and refreshToken
     */
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: '2m' }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: '45d' }
        )
        return { accessToken, refreshToken }
    }

    /**
     * Save refresh token to database
     * Updates existing token or creates new one
     * @param {string} userId - User ID
     * @param {string} refreshToken - Refresh token to save
     * @returns {Promise<Object>} Saved token record
     */
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ userId, refreshToken })
        return token
    }

    /**
     * Validate access token
     * @param {string} token - Access token to validate
     * @returns {Object|null} Decoded user data or null if invalid
     */
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    /**
     * Validate refresh token
     * @param {string} token - Refresh token to validate
     * @returns {Object|null} Decoded user data or null if invalid
     */
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
            return userData
        } catch (e) {
            return null
        }
    }

    /**
     * Find token record in database by refresh token
     * @param {string} refreshToken - Refresh token to find
     * @returns {Promise<Object|null>} Token record or null
     */
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken } })
        return tokenData
    }

    /**
     * Remove refresh token from database (logout)
     * @param {string} refreshToken - Refresh token to remove
     * @returns {Promise<void>}
     */
    async removeToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken } })
        if (tokenData) {
            await tokenData.destroy()
        }
    }
}

module.exports = new TokenService()