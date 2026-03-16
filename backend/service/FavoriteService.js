const { FavoriteProduct, Seller, Product } = require('../models')
const ApiError = require('../exceptions/ApiError')

/**
 * Service for managing user favorite products (wishlist)
 */
class FavoriteService {
    /**
     * Get all products in user's favorites with product and seller details
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of favorite products
     */
    async getFavorites(userId) {
        const favoriteProducts = await FavoriteProduct.findAll({
            where: { userId },
            include: [{
                model: Product,
                include: [{ model: Seller, attributes: ['id', 'name'] }]
            }],
            order: [['createdAt', 'DESC']]
        })

        if (!favoriteProducts) {
            return []
        }

        return favoriteProducts
    }

    /**
     * Add a product to user's favorites
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to add
     * @returns {Promise<Object>} Created or existing favorite product
     */
    async addFavoriteProduct(userId, productId) {
        // Check if product already exists in favorites
        const existingProduct = await FavoriteProduct.findOne({ where: { userId, productId } })
        if (existingProduct) {
            return existingProduct
        }

        const newProduct = await FavoriteProduct.create({ userId, productId })
        return newProduct
    }

    /**
     * Remove a product from user's favorites
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to remove
     * @returns {Promise<Object>} Deleted favorite product
     */
    async removeFavoriteProduct(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const favoriteProduct = await FavoriteProduct.findOne({
            where: { userId, productId }
        })
        if (!favoriteProduct) {
            throw ApiError.NotFound('Product not found in favorites')
        }

        await favoriteProduct.destroy()
        return favoriteProduct
    }

    /**
     * Count total number of products in user's favorites
     * @param {string} userId - User ID
     * @returns {Promise<number>} Favorites count
     */
    async count(userId) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        const count = await FavoriteProduct.count({ where: { userId } })
        return count
    }

    /**
     * Merge guest favorites into user's favorites after login
     * @param {string} userId - User ID
     * @param {Array} guestItems - Array of guest favorite items
     * @returns {Promise<Array>} Updated favorites list
     */
    async mergeFavorites(userId, guestItems) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        if (!Array.isArray(guestItems)) {
            throw ApiError.BadRequest('Invalid items array')
        }

        // Add each guest item to user's favorites
        for (const g of guestItems) {
            if (!g.productId) continue
            await this.addFavoriteProduct(userId, g.productId)
        }

        return this.getFavorites(userId)
    }
}

module.exports = new FavoriteService()
