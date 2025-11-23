const { Category, Product } = require('../models/models')

class CategoryController {
    async getAll(req, res) {
        try {
            const categories = await Category.findAll()
            return res.json(categories)
        } catch (error) {
            console.error('Error getting categories:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Category ID is required' })
            }
            
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(404).json({ message: 'Category not found' })
            }
            
            return res.json(category)
        } catch (error) {
            console.error('Error getting category by ID:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async create(req, res) {
        try {
            const { name } = req.body
            if (!name) {
                return res.status(400).json({ message: 'Category name is required' })
            }
            
            const category = await Category.create({ name })
            return res.status(201).json(category)
        } catch (error) {
            console.error('Error creating category:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Category ID is required' })
            }

            // Проверяем существование категории
            const category = await Category.findByPk(id)
            if (!category) {
                return res.status(404).json({ message: 'Category not found' })
            }

            // Проверяем, есть ли продукты в этой категории
            const productsInCategory = await Product.count({ where: { categoryId: id } })
            if (productsInCategory > 0) {
                return res.status(400).json({ 
                    message: `Cannot delete category. There are ${productsInCategory} products in this category.` 
                })
            }

            // Удаляем категорию
            await Category.destroy({ where: { id } })
            
            return res.json({ message: 'Category deleted successfully' })
        } catch (error) {
            console.error('Error deleting category:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new CategoryController()

