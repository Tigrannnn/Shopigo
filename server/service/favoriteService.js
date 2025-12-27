const { Favorites, FavoriteProduct, Seller, Product } = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class FavoriteService {
    async getFavorites (userId) {
        let favorites = await Favorites.findOne({
            where: { userId },
            include: [{ 
                model: FavoriteProduct, 
                include: [{
                    model: Product, 
                    include: [{ model: Seller, attributes: ['id', 'name']}]
                }] 
            }] 
        })

        if(!favorites){
            favorites = await Favorites.create({ userId })
        }

        return favorites
    }

    async addFavoriteProduct (userId, productId) {
        let favorites = await Favorites.findOne({ where: { userId } })
        if(!favorites){
            favorites = await Favorites.create({ userId })
        }

        const newProduct = await FavoriteProduct.create({ favoritesId: favorites.id, productId })
        return newProduct
    }

    async removeFavoriteProduct (userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const favorites = await Favorites.findOne({ where: { userId } })
        if(!favorites){
            throw ApiError.NotFound('Favorites not found')
        }
        
        const favoriteProduct = await FavoriteProduct.findOne({
            where: { favoritesId: favorites.id, productId }
        })
        if (!favoriteProduct) {
            throw ApiError.NotFound('Product not found in favorites')
        }
        
        await favoriteProduct.destroy()
        return { message: 'Product removed from favorites' }
    }
}

module.exports = new FavoriteService()