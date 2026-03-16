const Router = require('express')
const router = new Router()
const FavoriteController = require('../controllers/FavoriteController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, FavoriteController.getFavorites)
router.post('/', authMiddleware, FavoriteController.addFavoriteProduct)
router.delete('/', authMiddleware, FavoriteController.removeFavoriteProduct)
router.get('/count', authMiddleware, FavoriteController.count)
router.post('/merge', authMiddleware, FavoriteController.merge)

module.exports = router 