const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Forbidden' })
            }
            next()
        } catch (e) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
}