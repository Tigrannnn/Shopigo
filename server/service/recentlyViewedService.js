const { RecentlyViewedProduct, RecentlyViewed, Product, Seller } = require("../models/models")

class RecentlyViewedService {
    async getRecentlyViewed(userId) {
        let recentlyViewed = await RecentlyViewed.findOne({
            where: { userId },
            include: [{
                model: RecentlyViewedProduct, include: [{
                    model: Product, 
                    include: [{ model: Seller, attributes: ['id', 'name'] }]
                }] 
            }] 
        })
        if(!recentlyViewed){
            recentlyViewed = await RecentlyViewed.create({ userId })
        }
        return recentlyViewed
    }

    async addRecentlyViewed(userId, productId) {
        let recentlyViewed = await RecentlyViewed.findOne({ where: { userId } })
        if(!recentlyViewed){
            recentlyViewed = await RecentlyViewed.create({ userId })
        }

        const newProduct = await RecentlyViewedProduct.create({ recentlyViewedId: recentlyViewed.id, productId })
        return newProduct
    }
}

module.exports = new RecentlyViewedService()