const { Favorites, FavoriteProduct, Seller, Product } = require('../models/models')

class FavoriteController {
    async getFavorites(req, res) {
        try{
            const userId = req.user.id
            let favorites = await Favorites.findOne({
                where: { userId },
                include: [{ 
                    model: FavoriteProduct, include: [{
                        model: Product, 
                        include: [{ model: Seller, attributes: ['id', 'name']}]
                    }] 
                }] 
            })
            if(!favorites){
                favorites = await Favorites.create({ userId })
            }
            return res.json(favorites)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async addFavoriteProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            let favorites = await Favorites.findOne({ where: { userId } })
            if(!favorites){
                favorites = await Favorites.create({ userId })
            }

            const newProduct = await FavoriteProduct.create({ favoritesId: favorites.id, productId })
            return res.json(newProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async removeFavoriteProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' })
            }

            const favorites = await Favorites.findOne({ where: { userId } })
            if(!favorites){
                return res.status(400).json({ message: 'Favorites not found' })
            }
            
            const favoritesProduct = await FavoriteProduct.findOne({
                where: { favoritesId: favorites.id, productId }
            })
            if (!favoritesProduct) {
                return res.status(400).json({ message: 'Product not found in favorites' })
            }
            
            await favoritesProduct.destroy()
            return res.json({ message: 'Product removed from favorites' })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new FavoriteController()