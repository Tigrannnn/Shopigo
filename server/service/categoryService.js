const { Category, Product } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../exceptions/ApiError')

class CategoryService {
    async getAll() {
        const categories = await Category.findAll()
        return categories
    }

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

    async create(name, icon) {
        if (!name) {
            throw ApiError.BadRequest('Category name is required')
        }
        
        if (!icon) {
            throw ApiError.BadRequest('Icon file is required')
        }
        
        const staticDir = path.resolve(__dirname, '..', 'static')
        if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir, { recursive: true })
        }

        const fileExtension = icon.name.split('.').pop()
        if (!fileExtension) {
            throw ApiError.BadRequest('Invalid icon file')
        }

        let fileName = uuid.v4() + '.' + fileExtension
        await icon.mv(path.resolve(staticDir, fileName))

        const category = await Category.create({ name, icon: fileName })
        return category
    }
    
    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('Category ID is required')
        }

        const category = await Category.findByPk(id)
        if (!category) {
            throw ApiError.NotFound('Category not found')
        }

        const productsInCategory = await Product.count({ where: { categoryId: id } })
        if (productsInCategory > 0) {
            throw ApiError.BadRequest(`Cannot delete category. There are ${productsInCategory} products in this category.`)
        }

        await Category.destroy({ where: { id } })
        return { message: 'Category deleted successfully' }
    }
}

module.exports = new CategoryService()