const { User, Basket, Favorites } = require('../models/models')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/ApiError')
const TokenService = require('./tokenService')


class UserService {
    async login(body) {
        const {email, password, role } = body

        if (!email || !password) {
            throw ApiError.BadRequest('Email and password are required')
        }

        const code = Math.floor(100000 + Math.random() * 900000)

        const user = await User.findOne({ where: { email } })
        if (user) {
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw ApiError.BadRequest('Invalid password')
            }
            const { accessToken } = TokenService.generateTokens({ id: user.id, email: user.email, role: role || user.role, name: user.name })
            return accessToken
        } else {
            try {
                const hashPassword = await bcrypt.hash(password, 10)
                const newUser = await User.create({ email, password: hashPassword, role })
                const basket = await Basket.create({ userId: newUser.id })
                const favorites = await Favorites.create({ userId: newUser.id })
                const { accessToken } = TokenService.generateTokens({
                    id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name
                })
                return accessToken
            } catch (e) {
                throw ApiError.Internal(e.message)
            }
        }
    }

    async auth(user) {
        if (!user) {
            return;
        }
        const { id, email, role, name } = user
        const { accessToken } = TokenService.generateTokens({ id, email, role, name })
        return { accessToken, user }
    }
}

module.exports = new UserService()