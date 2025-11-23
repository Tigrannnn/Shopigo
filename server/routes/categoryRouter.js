const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.getAll)

router.get('/:id', CategoryController.getById)

router.post('/', CategoryController.create)

router.delete('/:id', CategoryController.delete)

module.exports = router