const Router = require('express')
const router = new Router()
const SellerController = require('../controllers/SellerController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', SellerController.getAll)

router.get('/:id', SellerController.getById)

router.post('/', checkRoleMiddleware('ADMIN'), SellerController.create)

router.put('/:id', checkRoleMiddleware('ADMIN'), SellerController.update)

router.delete('/:id', checkRoleMiddleware('ADMIN'), SellerController.delete)

module.exports = router
 