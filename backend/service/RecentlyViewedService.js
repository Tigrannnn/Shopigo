const { RecentlyViewedProduct, Product, Seller } = require("../models")
const ApiError = require('../exceptions/ApiError')

/**
 * Service for managing recently viewed products
 */
class RecentlyViewedService {
    /**
     * Get user's recently viewed products (max 6 items)
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of recently viewed products
     */
    async getRecentlyViewed(userId) {
        const recentlyViewedProducts = await RecentlyViewedProduct.findAll({
            where: { userId },
            include: [{
                model: Product,
                include: [{ model: Seller, attributes: ['id', 'name'] }]
            }],
            order: [['updatedAt', 'DESC']],
            limit: 6
        })

        if (!recentlyViewedProducts) {
            return []
        }

        return recentlyViewedProducts
    }

    /**
     * Add a product to recently viewed list
     * Updates timestamp if already exists, or removes oldest if limit reached
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to add
     * @returns {Promise<Object>} Created or updated recently viewed product
     */
    async addRecentlyViewed(userId, productId) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }

        // Ensure the product exists (prevents foreign key failures)
        const product = await Product.findByPk(productId)
        if (!product) {
            throw ApiError.NotFound('Product not found')
        }

        // Check if product already viewed recently
        const existingProduct = await RecentlyViewedProduct.findOne({
            where: { userId, productId }
        })

        if (existingProduct) {
            // Update timestamp to move it to the top
            const updatedProduct = await existingProduct.update({ updatedAt: new Date() })
            return updatedProduct
        }

        // Check if we've reached the limit of 6 items
        const count = await RecentlyViewedProduct.count({ where: { userId } })

        if (count >= 6) {
            // Remove the oldest viewed product
            const oldestProduct = await RecentlyViewedProduct.findOne({
                where: { userId },
                order: [['updatedAt', 'ASC']]
            })
            if (oldestProduct) {
                await oldestProduct.destroy()
            }
        }

        const newProduct = await RecentlyViewedProduct.create({ userId, productId })
        return newProduct
    }

    /**
     * Merge guest recently viewed items into user's list after login
     * @param {string} userId - User ID
     * @param {Array} guestItems - Array of guest recently viewed items
     * @returns {Promise<Array>} Updated recently viewed list
     */
    async mergeRecentlyViewed(userId, guestItems) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        if (!Array.isArray(guestItems)) {
            throw ApiError.BadRequest('Invalid items array')
        }

        // Add each guest item to user's recently viewed
        for (const g of guestItems) {
            if (!g.productId) continue

            // Only merge items for products that still exist
            const product = await Product.findByPk(g.productId)
            if (!product) continue

            await this.addRecentlyViewed(userId, g.productId)
        }

        return this.getRecentlyViewed(userId)
    }
}

module.exports = new RecentlyViewedService()
