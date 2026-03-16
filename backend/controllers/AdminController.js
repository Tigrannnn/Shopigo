const AdminService = require('../service/AdminService')

class AdminController {
    async getStats (req, res, next) {
        try {
            const stats = await AdminService.getStats()
            return res.json(stats)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()