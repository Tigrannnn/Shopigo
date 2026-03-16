const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const RecentlyViewedController = require('../controllers/RecentlyViewedController')
const router = new Router()

router.get('/', authMiddleware, RecentlyViewedController.getRecentlyViewed)
router.post('/', authMiddleware, RecentlyViewedController.addRecentlyViewed)
router.post('/merge', authMiddleware, RecentlyViewedController.merge)

module.exports = router