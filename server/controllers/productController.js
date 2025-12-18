const ProductService = require('../service/productService')
const ApiError = require('../exceptions/ApiError')
const { Product } = require('../models/models')

class ProductController {
    async create(req, res, next) {
        try {
            const body = req.body
            const files = req.files

            const createdProduct = await ProductService.create(body, files)
            return res.json(createdProduct)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            let query = req.query

            const products = await ProductService.getAll(query)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            
            const product = await ProductService.getById(id)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const updateData = req.body

            if (!id) {
                throw ApiError.BadRequest('Product ID is required')
            }

            const product = await Product.findByPk(id)
            if (!product) {
                throw ApiError.NotFound('Product not found')
            }

            await Product.update(updateData, { where: { id } })
            
            const updatedProduct = await Product.findByPk(id)
            return res.json(updatedProduct)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                throw ApiError.BadRequest('Product ID is required')
            }

            const product = await Product.findByPk(id)
            if (!product) {
                throw ApiError.NotFound('Product not found')
            }

            await Product.destroy({ where: { id } })
            
            return { message: 'Product deleted successfully' }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()