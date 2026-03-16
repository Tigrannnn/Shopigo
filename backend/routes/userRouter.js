const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.post('/sendCode', UserController.sendCode)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/auth', authMiddleware, UserController.auth)
router.put('/changeInfo', authMiddleware, UserController.changeInfo)
router.put('/changeRole/:id', checkRoleMiddleware('ADMIN'), UserController.changeRole)
router.get('/getUsers', checkRoleMiddleware('ADMIN'), UserController.getUsers)
router.get('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

module.exports = router