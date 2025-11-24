const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.login)
router.get('/auth', UserController.auth)

module.exports = router