const CategoryService = require('../service/categoryService')

class CategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryService.getAll()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            
            const category = await CategoryService.getById(id)
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const { name } = req.body
            const { icon } = req.files

            const category = CategoryService.create(name, icon)
            return res.status(201).json(category)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            
            await CategoryService.delete(id)
            return res.json({ message: 'Category deleted successfully' })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()

