const ApiError = require("../exceptions/ApiError")
const { SearchHistoryItem, Product, Category, Seller } = require("../models")
const { Op } = require('sequelize')

/**
 * Service for managing search history and recommendations
 */
class SearchService {
    /**
     * Get user's search history (max 4 items)
     * @param {string} userId - User ID
     * @param {string} searchValue - Optional search value to filter history
     * @returns {Promise<Array>} Array of search history items
     */
    async getSearchHistory(userId, searchValue) {
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }

        // Filter history by search value if provided
        if (searchValue && searchValue.trim() !== '') {
            const searchHistoryItems = await SearchHistoryItem.findAll({
                where: {
                    userId,
                    value: {
                        [Op.iLike]: `%${searchValue}%`
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 4,
            })

            return searchHistoryItems
        }

        // Get all history items for user
        const searchHistoryItems = await SearchHistoryItem.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 4,
        })

        if (!searchHistoryItems) {
            return []
        }

        return searchHistoryItems
    }

    /**
     * Add a new search query to user's history
     * @param {string} userId - User ID
     * @param {string} value - Search query value
     * @returns {Promise<Object>} Created or existing search history item
     */
    async addSearchHistory(userId, value) {
        if (!value) {
            throw ApiError.BadRequest('Search value cannot be empty')
        }

        if (value.length > 255) {
            throw ApiError.BadRequest('Search value is too long')
        }

        // Check if this search already exists
        const existingItem = await SearchHistoryItem.findOne({
            where: { userId, value }
        })

        if (existingItem) {
            return existingItem
        }

        const newItem = await SearchHistoryItem.create({ userId, value })
        return newItem
    }

    /**
     * Remove a search history item
     * @param {string} userId - User ID
     * @param {string} searchItemId - Search history item ID
     * @returns {Promise<Object>} Deleted search history item
     */
    async removeSearchHistory(userId, searchItemId) {
        const item = await SearchHistoryItem.findOne({
            where: { id: searchItemId, userId }
        })

        if (!item) {
            throw ApiError.BadRequest('Search history item not found')
        }

        await item.destroy()
        return item
    }

    /**
     * Get search recommendations (products and categories)
     * @param {string} searchValue - Search term for recommendations
     * @returns {Promise<Array>} Array of recommended items
     */
    async getSearchRecommendations(searchValue) {
        const clean = searchValue ? searchValue.trim() : ''
        const like = `${clean}%`

        // If nothing is typed, return a random selection of items
        if (!clean) {
            const products = await Product.findAll({
                attributes: ['id', 'name'],
                order: Product.sequelize.random(),
                limit: 4,
            })

            const categories = await Category.findAll({
                attributes: ['id', 'name'],
                order: Category.sequelize.random(),
                limit: 4,
            })

            const sellers = await Seller.findAll({
                attributes: ['id', 'name'],
                order: Seller.sequelize.random(),
                limit: 4,
            })

            const history = await SearchHistoryItem.findAll({
                attributes: ['id', 'value'],
                order: SearchHistoryItem.sequelize.random(),
                limit: 4,
            })

            const combined = [...products, ...categories, ...sellers, ...history].map(item => ({
                id: item.id,
                name: item.name,
            }))

            const seen = new Set()
            const unique = combined.filter(item => {
                // Skip items without a valid name
                if (!item || typeof item.name !== 'string') return false
                const key = item.name.toLowerCase()
                if (seen.has(key)) return false
                seen.add(key)
                return true
            })

            // Return only the first 6 unique results
            return unique.slice(0, 6)
        }

        // Otherwise search by prefix
        const products = await Product.findAll({
            where: { name: { [Op.iLike]: like } },
            attributes: ['id', 'name'],
            limit: 4,
        })

        const categories = await Category.findAll({
            where: { name: { [Op.iLike]: like } },
            attributes: ['id', 'name'],
            limit: 4,
        })

        const sellers = await Seller.findAll({
            where: { name: { [Op.iLike]: like } },
            attributes: ['id', 'name'],
            limit: 4,
        })

        const history = await SearchHistoryItem.findAll({
            where: { value: { [Op.iLike]: like } },
            attributes: ['id', 'value'],
            limit: 4,
        })

        // Merge products and categories into one array of {id, name}
        const combined = [...products, ...categories, ...sellers, ...history].map(item => ({
            id: item.id,
            name: item.name || item.value,
        }))

        // Remove duplicates by name (keep first occurrence)
        const seen = new Set()
        const unique = combined.filter(item => {
            // Skip items without a valid name
            if (!item || typeof item.name !== 'string') return false
            const key = item.name.toLowerCase()
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })

        // Return only the first 6 unique results
        return unique.slice(0, 6)
    }
}

module.exports = new SearchService()
