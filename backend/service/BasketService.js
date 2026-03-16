const { BasketProduct, Seller, Product } = require('../models')
const ApiError = require('../exceptions/ApiError')

/**
 * Service for managing user shopping baskets
 */
class BasketService {
    /**
     * Get all products in user's basket with product and seller details
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of basket products
     */
    async getBasket(userId) {
        const basketProducts = await BasketProduct.findAll({
            where: { userId },
            include: [{
                model: Product,
                include: [{ model: Seller, attributes: ['id', 'name'] }]
            }],
            order: [['createdAt', 'DESC']]
        })

        if (!basketProducts) {
            return []
        }

        return basketProducts
    }

    /**
     * Add a product to the user's basket
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to add
     * @returns {Promise<Object>} Created basket product
     */
    async addBasketProduct(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        // Check if product already exists in basket
        const existingProduct = await BasketProduct.findOne({ where: { userId, productId } })
        if (existingProduct) {
            return
        }

        const newProduct = await BasketProduct.create({ userId, productId, quantity: 1, selected: true })
        return newProduct
    }

    /**
     * Remove a product from the user's basket
     * @param {string} userId - User ID
     * @param {string} productId - Product ID to remove
     * @returns {Promise<Object>} Success message
     */
    async removeBasketProduct(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        const basketProduct = await BasketProduct.findOne({ where: { userId, productId } })
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }

        await basketProduct.destroy()
        return { message: 'Product removed from basket' }
    }

    /**
     * Update product quantity in basket (+, -, or specific value)
     * @param {string} basketProductId - Basket product ID
     * @param {string} quantity - Quantity change ('+', '-', or number)
     * @returns {Promise<Object>} Updated basket product
     */
    async updateQuantity(basketProductId, quantity) {
        if (!basketProductId || !quantity) {
            throw ApiError.BadRequest('Basket Product ID or quantity are required')
        }

        const basketProduct = await BasketProduct.findByPk(basketProductId)
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }

        // Increment, decrement, or keep quantity based on the value
        quantity === '+' ?
            basketProduct.quantity += 1 :
            quantity === '-' ?
            basketProduct.quantity -= 1 : ''

        await basketProduct.save()
        return basketProduct
    }

    /**
     * Toggle product selection status in basket
     * @param {string} basketProductId - Basket product ID
     * @returns {Promise<Object>} Updated basket product
     */
    async toggleSelected(basketProductId) {
        if (!basketProductId) {
            throw ApiError.BadRequest('Basket product id ID is required')
        }

        const basketProduct = await BasketProduct.findByPk(basketProductId)
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }

        basketProduct.selected = !basketProduct.selected
        await basketProduct.save()
        return basketProduct
    }

    /**
     * Toggle selection status for all products in user's basket
     * If all are selected, deselect all; otherwise select all
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Updated products count
     */
    async toggleSelectAll(userId) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        const basketProducts = await BasketProduct.findAll({
            where: { userId }
        })
        if (basketProducts.length === 0) {
            throw ApiError.NotFound('Basket is empty')
        }

        // Check if all products are currently selected
        const isAllSelected = basketProducts.every(product => product.selected === true)

        const updatedProducts = await BasketProduct.update(
            { selected: !isAllSelected },
            { where: { userId } }
        )
        return updatedProducts
    }

    /**
     * Count total number of products in user's basket
     * @param {string} userId - User ID
     * @returns {Promise<number>} Product count
     */
    async count(userId) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        const count = await BasketProduct.count({ where: { userId } })
        return count
    }

    /**
     * Merge guest basket into user's basket after login
     * Combines quantities for duplicate products
     * @param {string} userId - User ID
     * @param {Array} guestBasketProducts - Array of guest basket items
     * @returns {Promise<Array>} Updated basket
     */
    async mergeBasket(userId, guestBasketProducts) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        if (!Array.isArray(guestBasketProducts)) {
            throw ApiError.BadRequest('Invalid guest basket products array')
        }

        // Fetch any existing entries for the products we're about to merge
        const existing = await BasketProduct.findAll({
            where: {
                userId,
                productId: guestBasketProducts.map(i => i.productId)
            }
        })

        // Create a map for quick lookup by productId
        const existingMap = new Map(existing.map(item => [item.productId, item]))

        for (const g of guestBasketProducts) {
            if (!g.productId) continue

            const qty = typeof g.quantity === 'number' && g.quantity > 0 ? g.quantity : 1
            const sel = Boolean(g.selected)

            const ex = existingMap.get(g.productId)
            if (ex) {
                // Product exists - update quantity and selected flag
                ex.quantity += qty
                ex.selected = ex.selected || sel
                await ex.save()
            } else {
                // Product doesn't exist - create new entry
                await BasketProduct.create({
                    userId,
                    productId: g.productId,
                    quantity: qty,
                    selected: sel,
                })
            }
        }

        // Return fresh list now that all updates are applied
        return this.getBasket(userId)
    }
}

module.exports = new BasketService()
