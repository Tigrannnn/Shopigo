const CategoryService = require('../service/CategoryService')

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
            const body = req.body
            const files = req.files

            const category = await CategoryService.create(body, files)
            return res.status(201).json(category)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body
            const files = req.files

            const category = await CategoryService.update(id, body, files)
            return res.json(category)
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

