const { Seller, Product } = require('../models')
const ApiError = require('../exceptions/ApiError')

/**
 * Service for managing sellers
 */
class SellerService {
    /**
     * Get all sellers
     * @returns {Promise<Array>} Array of all sellers
     */
    async getAll() {
        const sellers = await Seller.findAll()
        return sellers
    }

    /**
     * Get a single seller by ID
     * @param {string} id - Seller ID
     * @returns {Promise<Object>} Seller object
     */
    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }

        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }
        return seller
    }

    /**
     * Create a new seller
     * @param {string} name - Seller name
     * @returns {Promise<Object>} Created seller
     */
    async create(name) {
        if (!name) {
            throw ApiError.BadRequest('Name is required')
        }

        // Check if seller with this name already exists
        const existingSeller = await Seller.findOne({
            where: { name }
        })
        if (existingSeller) {
            throw ApiError.BadRequest('Seller with this name already exists')
        }

        const seller = await Seller.create({ name })
        return seller
    }

    /**
     * Update an existing seller
     * @param {string} id - Seller ID
     * @param {string} name - Updated seller name
     * @returns {Promise<Object>} Updated seller
     */
    async update(id, name) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }

        if (!name) {
            throw ApiError.BadRequest('Name is required')
        }

        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        // Check if name is already taken by another seller
        const existingSeller = await Seller.findOne({
            where: { name }
        })
        if (existingSeller && existingSeller.id !== id) {
            throw ApiError.BadRequest('Seller with this name already exists')
        }

        seller.name = name
        await seller.save()
        return seller
    }

    /**
     * Delete a seller (only if no associated products exist)
     * @param {string} id - Seller ID
     * @returns {Promise<Object>} Success message
     */
    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }

        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        // Check if seller has associated products
        const productsInSeller = await Product.count({ where: { sellerId: id } })
        if (productsInSeller > 0) {
            throw ApiError.BadRequest('Cannot delete seller with associated products')
        }

        await seller.destroy()
        return { message: 'Seller deleted successfully' }
    }
}

module.exports = new SellerService()