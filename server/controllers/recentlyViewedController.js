const RecentlyViewedService = require("../service/recentlyViewedService")

class RecentlyViewedController {
    async getRecentlyViewed (req, res, next) {
        try {
            const userId = req.user.id

            const recentlyViewed = await RecentlyViewedService.getRecentlyViewed(userId)
            return res.json(recentlyViewed)
        } catch (e) {
            next(e)
        }
    }

    async addRecentlyViewed (req, res, next) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const newProduct = await RecentlyViewedService.addRecentlyViewed(userId, productId)
            return res.json(newProduct)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RecentlyViewedController()