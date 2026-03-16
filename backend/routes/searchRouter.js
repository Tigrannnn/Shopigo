const Router = require('express')
const router = new Router()
const SearchController = require('../controllers/SearchController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/history', authMiddleware, SearchController.getSearchHistory)
router.post('/history', authMiddleware, SearchController.addSearchHistory)
router.delete('/history', authMiddleware, SearchController.removeSearchHistory)
router.get('/recommend', SearchController.getSearchRecommended)

module.exports = router