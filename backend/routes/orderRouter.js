const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/OrderController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', authMiddleware, OrderController.createOrder)
router.post('/direct', authMiddleware, OrderController.createOrderDirect)
router.get('/', authMiddleware, OrderController.getOrders)
router.get('/count', authMiddleware, OrderController.count)
router.get('/all', checkRoleMiddleware('ADMIN'), OrderController.getAllOrders)

module.exports = router
 