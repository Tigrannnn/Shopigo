const Router = require('express')
const router = new Router()
const FavoriteController = require('../controllers/FavoriteController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, FavoriteController.getFavorites)
router.post('/', authMiddleware, FavoriteController.addFavoriteProduct)
router.delete('/', authMiddleware, FavoriteController.removeFavoriteProduct)

module.exports = router 