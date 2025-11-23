const Router = require('express')
const router = new Router()
const ReviewController = require('../controllers/ReviewController')

router.get('/', ReviewController.getAll)

router.get('/:id', ReviewController.getById)

router.post('/', ReviewController.create)

router.put('/:id', ReviewController.update)

router.delete('/:id', ReviewController.delete)

module.exports = router 