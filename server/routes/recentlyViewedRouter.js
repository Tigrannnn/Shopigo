const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const RecentlyViewedController = require('../controllers/recentlyViewedController')
const router = new Router()

router.get('/', authMiddleware, RecentlyViewedController.getRecentlyViewed)
router.post('/', authMiddleware, RecentlyViewedController.addRecentlyViewed)

module.exports = router