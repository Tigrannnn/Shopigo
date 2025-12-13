const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, BasketController.getBasket)
router.post('/', authMiddleware, BasketController.addBasketProduct)
router.put('/update-quantity', authMiddleware, BasketController.updateQuantity)
router.put('/toggle-selected', authMiddleware, BasketController.toggleSelected)
router.put('/select-all', authMiddleware, BasketController.toggleSelectAll)
router.delete('/', authMiddleware, BasketController.removeBasketProduct)

module.exports = router