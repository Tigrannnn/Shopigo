const { Product, ProductInfo, Seller } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { model, _attributes } = require('../db')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, description, rating, article, categoryId, sellerId, productInfo } = req.body

            // Валидация обязательных полей
            if (!name || !price || !article || !categoryId || !sellerId) {
                return res.status(400).json({ message: 'All fields are required' })
            }

            // Проверяем наличие файла изображения
            if (!req.files || !req.files.image) {
                return res.status(400).json({ message: 'Image file is required' })
            }

            const { image } = req.files
            
            // Создаем директорию static, если её нет
            const staticDir = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, { recursive: true })
            }
            
            // Генерируем уникальное имя файла с сохранением расширения
            const fileExtension = image.name.split('.').pop() || 'jpg'
            let fileName = uuid.v4() + '.' + fileExtension
            await image.mv(path.resolve(staticDir, fileName))

            // Проверяем существование категории и продавца
            const category = await Category.findByPk(categoryId)
            if (!category) {
                return res.status(400).json({ message: 'Category not found' })
            }

            const seller = await Seller.findByPk(sellerId)
            if (!seller) {
                return res.status(400).json({ message: 'Seller not found' })
            }

            if (productInfo) {
                productInfo = JSON.parse(productInfo)
                productInfo.forEach(async (info) => {
                    await ProductInfo.create({
                        title: info.title,
                        description: info.description,
                        productId: info.idl
                    })
                })
            }

            const product = await Product.create({
                name,
                price,
                description,
                rating,
                image: fileName,
                deliveryDays,
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
            let { categoryId, sellerId, limit, page } = req.query
            page = page || 1
            limit = limit || null
            let offset = page * limit - limit

            let products
            if (categoryId && sellerId) {
                products = await Product.findAll({ where: { categoryId, sellerId }, limit, offset })
            } else if (categoryId && !sellerId) {
                products = await Product.findAll({ where: { categoryId }, limit, offset })
            } else if (sellerId && !categoryId) {
                products = await Product.findAll({ where: { sellerId }, limit, offset })
            } else if (!categoryId && !sellerId) {
                products = await Product.findAll({limit, offset, include: [{model: Seller, attributes: ['id', 'name']}]})
            }
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

            // Проверяем существование продукта
            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            // Обновляем продукт
            await Product.update(updateData, { where: { id } })
            
            // Возвращаем обновленный продукт
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

            // Проверяем существование продукта
            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            // Удаляем связанные данные (каскадное удаление)
            await ColorVariant.destroy({ where: { productId: id } })
            await SizeVariant.destroy({ where: { productId: id } })
            await Review.destroy({ where: { productId: id } })

            // Удаляем сам продукт
            await Product.destroy({ where: { id } })
            
            return res.json({ message: 'Product deleted successfully' })
        } catch (error) {
            console.error('Error deleting product:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new ProductController()