const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/CategoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')

router.get('/', CategoryController.getAll)

router.get('/:id', CategoryController.getById)

router.post('/', checkRoleMiddleware('ADMIN'), CategoryController.create)

router.put('/:id', checkRoleMiddleware('ADMIN'), CategoryController.update)

router.delete('/:id', checkRoleMiddleware('ADMIN'), CategoryController.delete)

module.exports = router