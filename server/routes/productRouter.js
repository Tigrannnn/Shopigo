const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getById)

router.post('/', ProductController.create)

router.put('/:id', ProductController.update)

router.delete('/:id', ProductController.delete)

module.exports = router