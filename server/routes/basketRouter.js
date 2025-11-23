const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/BasketController')

router.get('/', BasketController.getAll)

router.get('/:id', BasketController.getById)

router.post('/', BasketController.create)

router.put('/:id', BasketController.update)

router.delete('/:id', BasketController.delete)

module.exports = router