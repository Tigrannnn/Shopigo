const RecentlyViewedService = require("../service/RecentlyViewedService")

class RecentlyViewedController {
    async getRecentlyViewed (req, res, next) {
        try {
            const userId = req.user.id

            const recentlyViewedProducts = await RecentlyViewedService.getRecentlyViewed(userId)
            return res.json(recentlyViewedProducts)
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

    async merge(req, res, next) {
        try {
            const userId = req.user.id
            const { items } = req.body
            const list = await RecentlyViewedService.mergeRecentlyViewed(userId, items)
            return res.json(list)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RecentlyViewedController()