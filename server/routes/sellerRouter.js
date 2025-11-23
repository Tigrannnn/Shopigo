const Router = require('express')
const router = new Router()
const SellerController = require('../controllers/SellerController')

router.get('/', SellerController.getAll)

router.get('/:id', SellerController.getById)

router.post('/', SellerController.create)

router.put('/:id', SellerController.update)

router.delete('/:id', SellerController.delete)

module.exports = router
 