const ApiError = require("../exceptions/ApiError")
const { OrderProduct, BasketProduct, Product, User } = require("../models")
const { Op } = require('sequelize')

/**
 * Service for managing user orders
 */
class OrderService {
    /**
     * Create a new order from selected basket items
     * Moves selected basket products to order and removes them from basket
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Created order products
     */
    async createOrder(userId) {
        if (!userId) {
            throw ApiError.BadRequest('User Id is required')
        }

        // Get all selected products from user's basket
        const basketProducts = await BasketProduct.findAll({
            where: {
                userId,
                selected: true
            },
            include: [{
                model: Product
            }]
        })

        if (!basketProducts || basketProducts.length === 0) {
            throw ApiError.BadRequest('Basket is empty')
        }

        // Prepare order data from basket items
        const orderProducts = basketProducts.map(basketProduct => ({
            userId,
            productId: basketProduct.productId,
            quantity: basketProduct.quantity,
            price: basketProduct.product ? basketProduct.product.price : 0,
        }))

        // Create order records in bulk
        const createdOrderProducts = await OrderProduct.bulkCreate(orderProducts)

        // Remove ordered products from basket
        const basketProductIds = basketProducts.map(bp => bp.id)
        await BasketProduct.destroy({ where: { id: { [Op.in]: basketProductIds } } })

        return createdOrderProducts
    }

    /**
     * Create a direct order for a single product (Buy Now)
     * Creates an order without adding to basket
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to order
     * @param {number} quantity - Quantity to order
     * @returns {Promise<Object>} Created order product
     */
    async createOrderDirect(userId, productId, quantity = 1) {
        if (!userId) {
            throw ApiError.BadRequest('User Id is required')
        }
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }

        // Get product to get the price
        const product = await Product.findByPk(productId)
        if (!product) {
            throw ApiError.NotFound('Product not found')
        }

        // Create order record
        const orderProduct = await OrderProduct.create({
            userId,
            productId,
            quantity,
            price: product.price,
        })

        return orderProduct
    }

    /**
     * Get all orders for a specific user
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of user's order products
     */
    async getOrders(userId) {
        const orderProducts = await OrderProduct.findAll({
            where: { userId },
            include: Product,
            order: [['createdAt', 'DESC']]
        })

        return orderProducts
    }

    /**
     * Get all orders from all users (admin functionality)
     * @returns {Promise<Array>} Array of all order products
     */
    async getAllOrders() {
        const orderProducts = await OrderProduct.findAll({
            include: [
                { model: Product },
                { model: User },
            ],
            order: [['createdAt', 'DESC']]
        })

        // Filter out orders where product or user is null (deleted)
        return orderProducts.filter(op => op.Product !== null && op.User !== null)
    }

    /**
     * Delete a product from order
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to remove
     * @returns {Promise<Object>} Deleted order product
     */
    async deleteOrderProduct(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const orderProduct = await OrderProduct.findOne({
            where: { userId, productId }
        })
        if (!orderProduct) {
            throw ApiError.NotFound('Product not found in order')
        }

        await orderProduct.destroy()
        return orderProduct
    }

    /**
     * Count total number of products in user's orders
     * @param {string} userId - User ID
     * @returns {Promise<number>} Order products count
     */
    async count(userId) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        const count = await OrderProduct.count({ where: { userId } })
        return count
    }
}

module.exports = new OrderService()