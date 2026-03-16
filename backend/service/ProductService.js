const { Product, Seller, Category, BasketProduct, FavoriteProduct, OrderProduct, RecentlyViewedProduct } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('../db/db')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../exceptions/ApiError')
const { ensureUploadDir } = require('../utils/storage')
const { uploadBuffer } = require('../utils/cloudinary')
const generateArticle = require('../utils/generateArticle')

/**
 * Service for managing products
 */
class ProductService {
    /**
     * Create a new product with image upload
     * @param {Object} body - Product data (name, price, description, etc.)
     * @param {Object} files - Uploaded files (image)
     * @returns {Promise<Object>} Created product
     */
    async create(body, files) {
        const { name, price, description, rating = 0, categoryId, sellerId } = body
        const image = files?.image

        if (!name || !price || !description || !categoryId || !sellerId) {
            throw ApiError.BadRequest('Name, price, description, categoryId and sellerId are required')
        }

        if (!image) {
            throw ApiError.BadRequest('Image is required')
        }

        // Ensure upload directory exists (read-only deploy environments use /tmp)
        const uploadDir = ensureUploadDir()

        // Get file extension and validate
        const fileExtension = image.name.split('.').pop()

        if (!fileExtension) {
            throw ApiError.BadRequest('Invalid image file')
        }

        // Generate unique filename
        let fileName = uuid.v4() + '.' + fileExtension

        let imageUrl
        if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
            imageUrl = await uploadBuffer(image.data, fileName, 'products')
        } else {
            await image.mv(path.resolve(uploadDir, fileName))
            imageUrl = fileName
        }

        // Verify category and seller exist
        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        const seller = await Seller.findByPk(sellerId)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        // Generate unique article number
        const article = await generateArticle()

        const product = await Product.create({
            name,
            price,
            description,
            rating,
            image: imageUrl,
            article,
            categoryId,
            sellerId
        })

        return product
    }

    /**
     * Get all products with filtering, search, pagination and seed-based random order.
     * @param {Object} query - Query parameters (categoryId, sellerId, limit, page, search, seed)
     * @returns {Promise<Array>} Array of products
     */
    async getAll(query) {
        let { categoryId, sellerId, limit, page, search, seed, order } = query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let where = {}

        // Filter by seller
        if (sellerId) {
            where.sellerId = sellerId
        }
        // Filter by category
        if (categoryId) {
            where.categoryId = categoryId
        }

        // Fuzzy search across multiple fields
        if (search) {
            const cleanSearch = search.trim();

            const fuzzySearch = `%${cleanSearch
                .split(/[^\p{L}\p{N}]+/u)
                .filter(Boolean)
                .join('%')}%`;

            where[Op.or] = [
                { name: { [Op.iLike]: `%${fuzzySearch}%` } },
                { article: { [Op.iLike]: `%${fuzzySearch}%` } },
                { description: { [Op.iLike]: `%${fuzzySearch}%` } },
                { '$category.name$': { [Op.iLike]: `%${fuzzySearch}%` } },
                { '$seller.name$': { [Op.iLike]: `%${fuzzySearch}%` } },
            ]
        }

        const numericSeed = Number(seed) || 0
        const orderExpr = sequelize.literal(`md5('${numericSeed}' || "product"."id"::text)`)

        const products = await Product.findAll({
            where,
            limit,
            offset,
            order: order ?? [[orderExpr, 'ASC']],
            subQuery: false,
            include: [
                { model: Category, attributes: ['id', 'name', 'icon'] },
                { model: Seller, attributes: ['id', 'name'] },
            ]
        })

        return products
    }

    /**
     * Get search term recommendations based on product/category names
     * @param {string} term - Search term
     * @returns {Promise<Array>} Array of suggested search terms
     */
    async getSearchRecommendations(term) {
        if (!term || !term.trim()) {
            return []
        }

        const clean = term.trim()

        return unique
    }

    /**
     * Get a single product by ID with seller and category details
     * @param {string} id - Product ID
     * @returns {Promise<Object>} Product object
     */
    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const product = await Product.findOne({
            where: { id },
            include: [
                { model: Seller },
                { model: Category }
            ]
        })

        if (!product) {
            throw ApiError.NotFound('Product not found')
        }
        return product
    }

    /**
     * Update an existing product (fields and/or image)
     * @param {string} id - Product ID
     * @param {Object} body - Updated product data
     * @param {Object} files - Uploaded files (new image)
     * @returns {Promise<Object>} Updated product
     */
    async update(id, body, files) {
        const { name, price, description, categoryId, sellerId } = body
        const image = files?.image

        if (!id) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const product = await Product.findByPk(id)
        if (!product) {
            throw ApiError.NotFound('Product not found')
        }

        // Update fields if provided
        if (name) {
            product.name = name
        }

        if (price) {
            product.price = price
        }

        if (description) {
            product.description = description
        }

        if (categoryId) {
            product.categoryId = categoryId
        }

        if (sellerId) {
            product.sellerId = sellerId
        }

        // Handle new image upload if provided
        if (image) {
            const uploadDir = ensureUploadDir()

            const fileExtension = image.name.split('.').pop()
            if (!fileExtension) {
                throw ApiError.BadRequest('Invalid image file')
            }

            let fileName = uuid.v4() + '.' + fileExtension

            if (process.env.CLOUDINARY_URL || process.env.CLOUDINARY_CLOUD_NAME) {
                product.image = await uploadBuffer(image.data, fileName, 'products')
            } else {
                await image.mv(path.resolve(uploadDir, fileName))
                product.image = fileName
            }
        }

        await product.save()
        return product
    }

    /**
     * Delete a product and all related records
     * @param {string} id - Product ID
     * @returns {Promise<Object>} Success message
     */
    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const product = await Product.findByPk(id)
        if (!product) {
            throw ApiError.NotFound('Product not found')
        }

        // Delete related records first
        await BasketProduct.destroy({ where: { productId: id } })
        await FavoriteProduct.destroy({ where: { productId: id } })
        await OrderProduct.destroy({ where: { productId: id } })
        await RecentlyViewedProduct.destroy({ where: { productId: id } })

        // Delete local file only when using local storage (not Cloudinary)
        if (!process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_CLOUD_NAME) {
            const uploadDir = ensureUploadDir()
            if (product.image) {
                const imagePath = path.resolve(uploadDir, product.image)
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }
        }

        // Delete product
        await Product.destroy({ where: { id } })
        return { message: 'Product deleted successfully' }
    }
}

module.exports = new ProductService()