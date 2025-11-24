const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', CategoryController.getAll)

router.get('/:id', CategoryController.getById)

router.post('/', checkRoleMiddleware('ADMIN'), CategoryController.create)

router.delete('/:id', checkRoleMiddleware('ADMIN'), CategoryController.delete)

module.exports = router