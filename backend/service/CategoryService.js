const { Category, Product } = require('../models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../exceptions/ApiError')
const { ensureUploadDir } = require('../utils/storage')
const { uploadBuffer } = require('../utils/cloudinary')

/**
 * Service for managing product categories
 */
class CategoryService {
    /**
     * Get all categories sorted by creation date
     * @returns {Promise<Array>} Array of all categories
     */
    async getAll() {
        const categories = await Category.findAll({ order: [['createdAt', 'ASC']] })
        return categories
    }

    /**
     * Get a single category by ID
     * @param {string} id - Category ID
     * @returns {Promise<Object>} Category object
     */
    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest('Category ID is required')
        }

        const category = await Category.findByPk(id)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        return category
    }

    /**
     * Create a new category with icon upload
     * @param {Object} body - Request body containing category name
     * @param {Object} files - Uploaded files (icon)
     * @returns {Promise<Object>} Created category
     */
    async create(body, files) {
        const { name } = body
        const icon = files?.icon

        if (!name) {
            throw ApiError.BadRequest('Category name is required')
        }

        if (!icon) {
            throw ApiError.BadRequest('Icon file is required')
        }

        // Ensure upload directory exists (handles read-only deployment environments)
        const uploadDir = ensureUploadDir()

        // Get file extension and validate
        const fileExtension = icon.name.split('.').pop()
        if (!fileExtension) {
            throw ApiError.BadRequest('Invalid icon file')
        }

        // Generate unique filename
        let fileName = uuid.v4() + '.' + fileExtension

        let iconUrl
        if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
            iconUrl = await uploadBuffer(icon.data, fileName, 'categories')
        } else {
            await icon.mv(path.resolve(uploadDir, fileName))
            iconUrl = fileName
        }

        const category = await Category.create({ name, icon: iconUrl })
        return category
    }

    /**
     * Update an existing category (name and/or icon)
     * @param {string} id - Category ID
     * @param {Object} body - Request body containing updated name
     * @param {Object} files - Uploaded files (new icon)
     * @returns {Promise<Object>} Updated category
     */
    async update(id, body, files) {
        const { name } = body
        const icon = files?.icon

        if (!id) {
            throw ApiError.BadRequest('Category ID is required')
        }

        const category = await Category.findByPk(id)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        // Update name if provided
        if (name) {
            category.name = name
        }

        // Handle new icon upload if provided
        if (icon) {
            const uploadDir = ensureUploadDir()

            const fileExtension = icon.name.split('.').pop()
            if (!fileExtension) {
                throw ApiError.BadRequest('Invalid icon file')
            }

            let fileName = uuid.v4() + '.' + fileExtension

            if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
                category.icon = await uploadBuffer(icon.data, fileName, 'categories')
            } else {
                await icon.mv(path.resolve(uploadDir, fileName))
                category.icon = fileName
            }
        }

        await category.save()
        return category
    }

    /**
     * Delete a category and all its associated products
     * @param {string} id - Category ID
     * @returns {Promise<Object>} Success message
     */
    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('Category ID is required')
        }

        const category = await Category.findByPk(id)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        // Delete all products in this category first
        const products = await Product.findAll({ where: { categoryId: id } })
        for (const product of products) {
            await ProductService.delete(product.id)
        }
        // Then delete the category
        await Category.destroy({ where: { id } })
        return { message: 'Category deleted successfully' }
    }
}

module.exports = new CategoryService()