const Router = require('express')
const router = new Router()
const FavoriteController = require('../controllers/FavoriteController')

router.get('/', FavoriteController.getAll)

router.get('/:id', FavoriteController.getById)

router.post('/', FavoriteController.create)

router.put('/:id', FavoriteController.update)

router.delete('/:id', FavoriteController.delete)

module.exports = router 