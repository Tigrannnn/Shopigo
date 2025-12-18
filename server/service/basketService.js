const { Basket, BasketProduct, Seller, Product } = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class BasketService {
    async getBasket(userId) {
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
        return basket
    }

    async addBasketProduct(userId, productId, quantity, selected) {
        if (!productId || !quantity || !selected) {
            throw ApiError.BadRequest('Product ID, quantity and selected are required')
        }
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        const basket = await this.getBasket(userId)
        if (!basket) {
            throw ApiError.NotFound('Basket not found')
        }
        const existingProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
        if(existingProduct){
            existingProduct.quantity += quantity
            await existingProduct.save()
            return existingProduct
        }
        const newProduct = await BasketProduct.create({ basketId: basket.id, productId, quantity, selected })
        return newProduct
    }

    async removeBasketProduct(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        const basket = await this.getBasket(userId)
        if (!basket) {
            throw ApiError.NotFound('Basket not found')
        }
        const basketProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }
        await basketProduct.destroy()
        return { message: 'Product removed from basket' }
    }

    async updateQuantity(userId, productId, quantity) {
        if (!productId || !quantity) {
            throw ApiError.BadRequest('Product ID and quantity are required')
        }

        const basket = await this.getBasket(userId)
        if (!basket) {
            throw ApiError.NotFound('Basket not found')
        }
        const basketProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }
        quantity === '+' ? 
        basketProduct.quantity += 1 : 
        quantity === '-' ? 
        basketProduct.quantity -= 1 : ''

        await basketProduct.save()
        return basketProduct
    }

    async toggleSelected(userId, productId) {
        if (!productId) {
            throw ApiError.BadRequest('Product ID is required')
        }
        if (!userId) {
            throw ApiError.BadRequest('User ID is required')
        }
        const basket = await this.getBasket(userId)
        if (!basket) {
            throw ApiError.NotFound('Basket not found')
        }
        const basketProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } })
        if (!basketProduct) {
            throw ApiError.NotFound('Product not found in basket')
        }
        basketProduct.selected = !basketProduct.selected
        await basketProduct.save()
        return basketProduct
    }
    
    async toggleSelectAll(userId) {
        const basket = await this.getBasket(userId)
        if (!basket){
            throw ApiError.NotFound('Basket not found')
        }

        const basketProducts = await BasketProduct.findAll({
            where: { basketId: basket.id }
        })
        if (basketProducts.length === 0) {
            throw ApiError.NotFound('Basket is empty')
        }

        const isAllSelected = basketProducts.every(product => product.selected === true)

        const updatedProducts = await BasketProduct.update(
            {selected: !isAllSelected},
            {where: {basketId: basket.id}}
        )
        return updatedProducts
    }
}

module.exports = new BasketService()