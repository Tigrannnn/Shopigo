const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/ApiError')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') return next()
        try {
            const authHeader = req.headers.authorization
            const token = authHeader && authHeader.split(' ')[1]
            if (!token) {
                throw ApiError.Unauthorized('User not authorized')
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            if (decoded.role !== role) {
                throw ApiError.Forbidden('Forbidden')
            }
            req.user = decoded
            next()
        } catch (e) {
            throw ApiError.Unauthorized('User not authorized')
        }
    }
}