const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/sendCode', UserController.sendCode)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)
router.get('/logout', authMiddleware, UserController.logout)
router.get('/refresh', authMiddleware, UserController.refresh)

module.exports = router