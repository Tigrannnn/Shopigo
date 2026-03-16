const ApiError = require('../exceptions/ApiError')
const TokenService = require('../service/TokenService')

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') return next()
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            return next(ApiError.Unauthorized('User not authorized'))
        }
        const decoded = TokenService.validateAccessToken(token)
        if (!decoded) {
            return next(ApiError.Unauthorized('Invalid or expired token'))
        }
        req.user = decoded
        next()
    } catch (e) {
        return next(ApiError.Unauthorized('User not authorized'))
    }
}