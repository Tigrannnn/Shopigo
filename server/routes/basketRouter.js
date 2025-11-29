const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/BasketController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, BasketController.getBasket)
router.post('/', authMiddleware, BasketController.addBasketProduct)
router.put('/', authMiddleware, BasketController.updateQuantityBasketProduct)
router.delete('/', authMiddleware, BasketController.removeBasketProduct)

module.exports = router