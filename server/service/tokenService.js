const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: '15m' }
        )
        return { accessToken }
    }

    async saveToken(userId, refreshToken) {
        const token = await Token.findOne({ where: { userId } })
        if (token) {
            token.refreshToken = refreshToken
            await token.save()
            return token
        }
        const tokenData = await Token.create({ userId, refreshToken })
        return tokenData
    }
}

module.exports = new TokenService()