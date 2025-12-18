const { User, Basket, Favorites } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/ApiError')

const generateJwt = (id, email, role, name) => {
    return jwt.sign(
        { id, email, role, name }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '24h' }
    )
}


class UserService {
    async login(body) {
        const {email, password, role } = body

        if (!email || !password) {
            throw ApiError.BadRequest('Email and password are required')
        }

        const user = await User.findOne({ where: { email } })
        if (user) {
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw ApiError.Unauthorized('Invalid password')
            }
            const token = generateJwt(user.id, user.email, role || user.role, user.name)
            return token
        } else {
            try {
                const hashPassword = await bcrypt.hash(password, 10)
                const newUser = await User.create({ email, password: hashPassword, role })
                const basket = await Basket.create({ userId: newUser.id })
                const favorites = await Favorites.create({ userId: newUser.id })
                const token = generateJwt(newUser.id, newUser.email, newUser.role, newUser.name)
                return token
            } catch (e) {
                throw ApiError.Internal(e.message)
            }
        }
    }

    async auth(user) {
        if (!user) {
            return;
        }
        const token = generateJwt(user.id, user.email, user.role, user.name)
        return { token, user }
    }
}

module.exports = new UserService()