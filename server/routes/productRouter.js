const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getById)

router.post('/', checkRoleMiddleware('ADMIN'), ProductController.create)

router.put('/:id', checkRoleMiddleware('ADMIN'), ProductController.update)

router.delete('/:id', checkRoleMiddleware('ADMIN'), ProductController.delete)

module.exports = router