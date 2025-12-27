const { User, Basket, Favorites, RecentlyViewed } = require('../models/models')
const ApiError = require('../exceptions/ApiError')
const TokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const mailService = require('./mailService')
const redis = require('../db/redis')

class UserService {
    async sendCode (body) {
        const { email } = body

        if (!email) {
            throw ApiError.BadRequest('Email is required');
        }

        const serverCode = Math.floor(100000 + Math.random() * 900000).toString();

        await redis.set(`otp:${email}`, serverCode, 'EX', 600);

        await mailService.sendMail(email, serverCode);
        return { email, serverCode }
    }

    async login(body) {
        const { email, inputCode } = body
        if (!email) {
            throw ApiError.BadRequest('Email are required')
        }
        if (!inputCode) {
            throw ApiError.BadRequest('Code is required')
        }

        let user = await User.findOne({ where: { email } })

        const serverCode = await redis.get(`otp:${email}`)
        if (!serverCode) {
            throw ApiError.BadRequest('Code expired or not found')
        }

        if (String(serverCode) === String(inputCode)) {
            if (!user) {
                user = await User.create({ email, role: 'USER' })
                const basket = await Basket.create({ userId: user.id })
                const favorites = await Favorites.create({ userId: user.id })
                const recentlyViewed = await RecentlyViewed.create({ userId: user.id })
            }
            const userDto = new UserDto(user)
            const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto })
            await TokenService.saveToken(userDto.id, refreshToken)
            await redis.del(`otp:${email}`)
            return { accessToken, refreshToken, user }
        } else {
            throw ApiError.BadRequest('Wrong code')
        }
    }

    async auth(user) {
        if (!user) {
            return;
        }
        const userDto = new UserDto(user)
        const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto })
        return { accessToken, refreshToken, user }
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken)
        return { message: 'Logged out' }
    }

    async refresh(refreshToken) {
       
    }
}

module.exports = new UserService()