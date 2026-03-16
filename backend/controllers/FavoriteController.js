const FavoriteService = require('../service/FavoriteService')

class FavoriteController {
    async getFavorites(req, res, next) {
        try{
            const userId = req.user.id
            
            const favorites = await FavoriteService.getFavorites(userId)
            return res.json(favorites)
        } catch (e) {
            next(e)
        }
    }

    async addFavoriteProduct(req, res, next) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const newProduct = await FavoriteService.addFavoriteProduct(userId, productId)
            return res.json(newProduct)
        } catch (e) {
            next(e)
        }
    }

    async removeFavoriteProduct(req, res, next) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            await FavoriteService.removeFavoriteProduct(userId, productId)
            return res.json({ message: 'Product removed from favorites' })
        } catch (e) {
            next(e)
        }
    }

    async count(req, res, next) {
        try {
            const userId = req.user.id
            const count = await FavoriteService.count(userId)
            return res.json(count)
        } catch (e) {
            next(e)
        }
    }

    async merge(req, res, next) {
        try {
            const userId = req.user.id
            const { items } = req.body
            const favorites = await FavoriteService.mergeFavorites(userId, items)
            return res.json(favorites)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FavoriteController()