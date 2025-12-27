const { Product, Seller, Category } = require('../models/models')
const { Op } = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../exceptions/ApiError')
const generateArticle = require('../utils/generateArticle')

class ProductService {
    async create (body, files) {
        const { name, price, description, rating = 0, categoryId, sellerId } = body
        const { image } = files
        
        if (!name || !price || !categoryId || !sellerId) {
            throw ApiError.BadRequest('Name, price, article, categoryId and sellerId are required')
        }

        if (!image) {
            throw ApiError.BadRequest('Image is required')
        }
        
        const staticDir = path.resolve(__dirname, '..', 'static')
        if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir, { recursive: true })
        }
        
        const fileExtension = image.name.split('.').pop()

        if (!fileExtension) {
            throw ApiError.BadRequest('Invalid image file')
        }

        let fileName = uuid.v4() + '.' + fileExtension
        await image.mv(path.resolve(staticDir, fileName))

        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        const seller = await Seller.findByPk(sellerId)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        const article = await generateArticle()

        const product = await Product.create({
            name,
            price,
            description,
            rating,
            image: fileName,
            article,
            categoryId,
            sellerId
        })
        
        return product
    }

    async getAll(query) {
        let { categoryId, sellerId, limit, page, search } = query
        page = page || 1
        limit = limit || null
        let offset = page * limit - limit
        let where = {}

        if (sellerId) {
            where.sellerId = sellerId
        }
        if (categoryId) {
            where.categoryId = categoryId
        }
        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { article: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ]
        }

        const products = await Product.findAll({ where, limit, offset, include: [
                {model: Seller, attributes: ['id', 'name']},
            ]
        })

        return products
    }

    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest('Product ID is required')
        }

        const product = await Product.findOne({ where: { id }, include: [
                {model: Seller},
                {model: Category}
            ]
        })

        if (!product) {
            throw ApiError.NotFound('Product not found')
        }
        return product
    }
}

module.exports = new ProductService()