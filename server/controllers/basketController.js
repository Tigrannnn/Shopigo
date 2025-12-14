const { Basket, BasketProduct, Seller, Product } = require('../models/models')
const BasketService = require('../service/basketService')

class BasketController {
    async getBasket(req, res) {
        try{
            const userId = req.user.id
            const basket = await BasketService.getBasket(userId)
            return res.json(basket)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async addBasketProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId, quantity, selected } = req.body

            const basket = await BasketService.addBasketProduct(userId, productId, quantity, selected)

            return res.json(basket)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async removeBasketProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const basket = await BasketService.removeBasketProduct(userId, productId)
            return res.json(basket)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async updateQuantity(req, res) {
        try{
            const userId = req.user.id
            const { productId, quantity } = req.body

            const basketProduct = await BasketService.updateQuantity(userId, productId, quantity)
            return res.json(basketProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async toggleSelected(req, res) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            const basketProduct = await BasketService.toggleSelected(userId, productId)
            return res.json(basketProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async toggleSelectAll(req, res) {
        try{
            const userId = req.user.id

            const updatedProducts = await BasketService.toggleSelectAll(userId)
            return res.json(updatedProducts)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new BasketController()