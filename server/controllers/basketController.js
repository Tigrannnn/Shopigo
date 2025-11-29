const { Basket, BasketProduct, Seller, Product } = require('../models/models')

class BasketController {
    async getBasket(req, res) {
        try{
            const userId = req.user.id
            let basket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: BasketProduct, include: [{
                        model: Product, 
                        include: [{ model: Seller, attributes: ['id', 'name'] }]
                    }] 
                }] 
            })
            if(!basket){
                basket = await Basket.create({ userId })
            }
            return res.json(basket)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async addBasketProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId, quantity } = req.body

            let basket = await Basket.findOne({ where: { userId } })
            if(!basket){
                basket = await Basket.create({ userId })
            }

            const existingProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
            if(existingProduct){
                existingProduct.quantity += quantity
                await existingProduct.save()
                return res.json(existingProduct)
            }

            const newProduct = await BasketProduct.create({ basketId: basket.id, productId, quantity })
            return res.json(newProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async removeBasketProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId } = req.body

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' })
            }

            const basket = await Basket.findOne({ where: { userId } })
            if(!basket){
                return res.status(400).json({ message: 'Basket not found' })
            }
            
            const basketProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
            if(!basketProduct){
                return res.status(400).json({ message: 'Product not found in basket' })
            }
            
            await basketProduct.destroy()
            return res.json({ message: 'Product removed from basket' })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async updateQuantityBasketProduct(req, res) {
        try{
            const userId = req.user.id
            const { productId, quantity } = req.body

            if (!productId || !quantity) {
                return res.status(400).json({ message: 'Product ID and quantity are required' })
            }

            const basket = await Basket.findOne({ where: { userId } })
            if(!basket){
                return res.status(400).json({ message: 'Basket not found' })
            }
            
            const basketProduct = await BasketProduct.findOne({ 
                where: { basketId: basket.id, productId } 
            })
            if(!basketProduct){
                return res.status(400).json({ message: 'Product not found in basket' })
            }

            quantity === '+' ? 
            basketProduct.quantity += 1 : 
            quantity === '-' ? 
            basketProduct.quantity -= 1 : ''

            await basketProduct.save()
            
            return res.json(basketProduct)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new BasketController()