const BasketService = require('../service/basketService')

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
            const { productId, quantity, selected } = req.body

            const basket = await BasketService.addBasketProduct(userId, productId, quantity, selected)

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
            const userId = req.user.id
            const { productId, quantity } = req.body

            const basketProduct = await BasketService.updateQuantity(userId, productId, quantity)
            return res.json(basketProduct)
        } catch (e) {
            next(e)
        }
    }

    async toggleSelected(req, res, next) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const basketProduct = await BasketService.toggleSelected(userId, productId)
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
}

module.exports = new BasketController()