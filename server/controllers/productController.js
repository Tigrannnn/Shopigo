const { Product, Seller, Category } = require('../models/models')
const { Op } = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class ProductController {
    async create(req, res) {
        try {
            const { name, price, description, rating, article, categoryId, sellerId } = req.body

            if (!name || !price || !article || !categoryId || !sellerId) {
                return res.status(400).json({ message: 'All fields are required' })
            }

            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: 'Image file is required' })
            }

            const { image } = req.files
            
            const staticDir = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, { recursive: true })
            }
            
            const fileExtension = image.name.split('.').pop()

            if (!fileExtension) {
                return res.status(400).json({ message: 'Invalid image file' })
            }

            let fileName = uuid.v4() + '.' + fileExtension
            await image.mv(path.resolve(staticDir, fileName))

            const category = await Category.findByPk(categoryId)
            if (!category) {
                return res.status(400).json({ message: 'Category not found' })
            }

            const seller = await Seller.findByPk(sellerId)
            if (!seller) {
                return res.status(400).json({ message: 'Seller not found' })
            }

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

            return res.json(product)
        } catch (error) {
            console.error('Error creating product:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getAll(req, res) {
        try {
            let { categoryId, sellerId, limit, page, search } = req.query
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

            return res.json(products)
        } catch (error) {
            console.error('Error getting products:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Product ID is required' })
            }

            const product = await Product.findOne({ where: { id }, include: [
                    {model: Seller},
                    {model: Category}
                ]
            })

            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            return res.json(product)
        } catch (error) {
            console.error('Error getting product by ID:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const updateData = req.body

            if (!id) {
                return res.status(400).json({ message: 'Product ID is required' })
            }

            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            await Product.update(updateData, { where: { id } })
            
            const updatedProduct = await Product.findByPk(id)
            return res.json(updatedProduct)
        } catch (error) {
            console.error('Error updating product:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Product ID is required' })
            }

            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            await Product.destroy({ where: { id } })
            
            return res.json({ message: 'Product deleted successfully' })
        } catch (error) {
            console.error('Error deleting product:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new ProductController()