const BasketService = require('../service/BasketService')

class BasketController {
    async getBasket(req, res, next) {
        try{
            const userId = req.user.id
            const basket = await BasketService.getBasket(userId)
            return res.json(basket)
        } catch (e) {
            next(e)
        }
    }

    async addBasketProduct(req, res, next) {
        try{
            const userId = req.user.id
            const { productId }= req.body

            const basket = await BasketService.addBasketProduct(userId, productId)
            return res.json(basket)
        } catch (e) {
            next(e)
        }
    }

    async removeBasketProduct(req, res, next) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const basket = await BasketService.removeBasketProduct(userId, productId)
            return res.json(basket)
        } catch (e) {
            next(e)
        }
    }

    async updateQuantity(req, res, next) {
        try{
            const { basketProductId, quantity } = req.body

            const basketProduct = await BasketService.updateQuantity(basketProductId, quantity)
            return res.json(basketProduct)
        } catch (e) {
            next(e)
        }
    }

    async toggleSelected(req, res, next) {
        try{
            const { basketProductId } = req.body

            const basketProduct = await BasketService.toggleSelected(basketProductId)
            return res.json(basketProduct)
        } catch (e) {
            next(e)
        }
    }

    async toggleSelectAll(req, res, next) {
        try{
            const userId = req.user.id

            const updatedProducts = await BasketService.toggleSelectAll(userId)
            return res.json(updatedProducts)
        } catch (e) {
            next(e)
        }
    }

    async count(req, res, next) {
        try {
            const userId = req.user.id
            const count = await BasketService.count(userId)
            return res.json(count)
        } catch (e) {
            next(e)
        }
    }

    async merge(req, res, next) {
        try {
            const userId = req.user.id
            const { items } = req.body
            const basket = await BasketService.mergeBasket(userId, items)
            return res.json(basket)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BasketController()