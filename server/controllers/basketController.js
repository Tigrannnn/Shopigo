const { Basket, BasketProduct, User, Product } = require('../models/models')

class BasketController {
    async getAll(req, res) {
        try {
            const baskets = await Basket.findAll({
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { 
                        model: BasketProduct, 
                        include: [{ model: Product, attributes: ['id', 'name', 'images', 'price'] }]
                    }
                ]
            })
            return res.json(baskets)
        } catch (error) {
            console.error('Error getting baskets:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Basket ID is required' })
            }

            const basket = await Basket.findByPk(id, {
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { 
                        model: BasketProduct, 
                        include: [{ model: Product, attributes: ['id', 'name', 'images', 'price'] }]
                    }
                ]
            })

            if (!basket) {
                return res.status(404).json({ message: 'Basket not found' })
            }

            return res.json(basket)
        } catch (error) {
            console.error('Error getting basket by ID:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async create(req, res) {
        try {
            const { userId } = req.body

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' })
            }

            // Проверяем существование пользователя
            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            // Проверяем, есть ли уже корзина у пользователя
            const existingBasket = await Basket.findOne({ where: { userId } })
            if (existingBasket) {
                return res.status(400).json({ message: 'User already has a basket' })
            }

            const basket = await Basket.create({ userId })
            return res.status(201).json(basket)
        } catch (error) {
            console.error('Error creating basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const updateData = req.body

            if (!id) {
                return res.status(400).json({ message: 'Basket ID is required' })
            }

            // Проверяем существование корзины
            const basket = await Basket.findByPk(id)
            if (!basket) {
                return res.status(404).json({ message: 'Basket not found' })
            }

            // Обновляем корзину
            await Basket.update(updateData, { where: { id } })
            
            // Возвращаем обновленную корзину
            const updatedBasket = await Basket.findByPk(id, {
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { model: BasketProduct }
                ]
            })
            
            return res.json(updatedBasket)
        } catch (error) {
            console.error('Error updating basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Basket ID is required' })
            }

            // Проверяем существование корзины
            const basket = await Basket.findByPk(id)
            if (!basket) {
                return res.status(404).json({ message: 'Basket not found' })
            }

            // Удаляем продукты корзины
            await BasketProduct.destroy({ where: { basketId: id } })

            // Удаляем саму корзину
            await Basket.destroy({ where: { id } })
            
            return res.json({ message: 'Basket deleted successfully' })
        } catch (error) {
            console.error('Error deleting basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    // Дополнительные методы для работы с продуктами корзины
    async addProduct(req, res) {
        try {
            const { basketId, productId, quantity = 1, color, size } = req.body

            if (!basketId || !productId) {
                return res.status(400).json({ message: 'Basket ID and Product ID are required' })
            }

            // Проверяем существование корзины
            const basket = await Basket.findByPk(basketId)
            if (!basket) {
                return res.status(404).json({ message: 'Basket not found' })
            }

            // Проверяем существование продукта
            const product = await Product.findByPk(productId)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            // Проверяем, есть ли уже такой продукт в корзине
            const existingProduct = await BasketProduct.findOne({
                where: { basketId, productId, color, size }
            })

            if (existingProduct) {
                // Увеличиваем количество
                await BasketProduct.update(
                    { quantity: existingProduct.quantity + quantity },
                    { where: { id: existingProduct.id } }
                )
            } else {
                // Добавляем новый продукт
                await BasketProduct.create({
                    basketId,
                    productId,
                    name: product.name,
                    price: product.price,
                    quantity,
                    color,
                    size,
                    images: product.images,
                    deliveryDays: product.deliveryDays
                })
            }

            return res.status(201).json({ message: 'Product added to basket' })
        } catch (error) {
            console.error('Error adding product to basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async removeProduct(req, res) {
        try {
            const { basketId, productId } = req.params

            if (!basketId || !productId) {
                return res.status(400).json({ message: 'Basket ID and Product ID are required' })
            }

            // Проверяем существование продукта в корзине
            const basketProduct = await BasketProduct.findOne({
                where: { basketId, productId }
            })

            if (!basketProduct) {
                return res.status(404).json({ message: 'Product not found in basket' })
            }

            // Удаляем продукт из корзины
            await BasketProduct.destroy({ where: { id: basketProduct.id } })
            
            return res.json({ message: 'Product removed from basket' })
        } catch (error) {
            console.error('Error removing product from basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getByUserId(req, res) {
        try {
            const { userId } = req.params
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' })
            }

            const basket = await Basket.findOne({
                where: { userId },
                include: [
                    { 
                        model: BasketProduct, 
                        include: [{ model: Product, attributes: ['id', 'name', 'images', 'price'] }]
                    }
                ]
            })

            if (!basket) {
                return res.status(404).json({ message: 'Basket not found for this user' })
            }

            return res.json(basket)
        } catch (error) {
            console.error('Error getting user basket:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new BasketController()

