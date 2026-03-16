const Router = require('express')
const router = new Router()
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleware')
const adminController = require('../controllers/AdminController')

router.get('/stats', checkRoleMiddleWare('ADMIN'), adminController.getStats)

module.exports = router