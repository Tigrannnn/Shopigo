const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')

router.get('/', OrderController.getAll)

router.get('/:id', OrderController.getById)

router.post('/', OrderController.create)

router.put('/:id', OrderController.update)

router.delete('/:id', OrderController.delete)

module.exports = router
 