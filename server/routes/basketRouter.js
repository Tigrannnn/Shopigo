const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/BasketController')

router.get('/', BasketController.getAll)

router.get('/:id', BasketController.getById)

module.exports = router