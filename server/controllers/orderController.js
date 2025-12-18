const { Order, OrderProduct, User, Product } = require('../models/models')

class OrderController {
    async getAll(req, res, next) {
        try {
            const orders = await Order.findAll()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Order ID is required' })
            }

            const order = await Order.findByPk(id)

            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            }

            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const { userId, products } = req.body

            if (!userId || !products || !Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: 'User ID and products array are required' })
            }

            // Проверяем существование пользователя
            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            // Создаем заказ
            const order = await Order.create({
                userId,
                status: 'pending'
            })

            // Создаем продукты заказа
            const orderProducts = await Promise.all(
                products.map(product => 
                    OrderProduct.create({
                        orderId: order.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        color: product.color,
                        size: product.size,
                        images: product.images,
                        deliveryDays: product.deliveryDays
                    })
                )
            )

            // Возвращаем созданный заказ с продуктами
            const createdOrder = await Order.findByPk(order.id, {
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { 
                        model: OrderProduct, 
                        include: [{ model: Product, attributes: ['id', 'name', 'images'] }]
                    }
                ]
            })

            return res.status(201).json(createdOrder)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const updateData = req.body

            if (!id) {
                return res.status(400).json({ message: 'Order ID is required' })
            }

            // Проверяем существование заказа
            const order = await Order.findByPk(id)
            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            }

            // Обновляем заказ
            await Order.update(updateData, { where: { id } })
            
            // Возвращаем обновленный заказ
            const updatedOrder = await Order.findByPk(id, {
                include: [
                    { model: User, attributes: ['id', 'name', 'email'] },
                    { model: OrderProduct }
                ]
            })
            
            return res.json(updatedOrder)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Order ID is required' })
            }

            // Проверяем существование заказа
            const order = await Order.findByPk(id)
            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            }

            // Проверяем статус заказа (нельзя удалить доставленные заказы)
            if (order.status === 'delivered') {
                return res.status(400).json({ 
                    message: 'Cannot delete delivered orders' 
                })
            }

            // Удаляем продукты заказа
            await OrderProduct.destroy({ where: { orderId: id } })

            // Удаляем сам заказ
            await Order.destroy({ where: { id } })
            
            return res.json({ message: 'Order deleted successfully' })
        } catch (e) {
            next(e)
        }
    }

    // Дополнительный метод для получения заказов пользователя
    async getByUserId(req, res, next) {
        try {
            const { userId } = req.params
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' })
            }

            const orders = await Order.findAll({
                where: { userId },
                include: [
                    { model: OrderProduct, include: [{ model: Product, attributes: ['id', 'name', 'images'] }] }
                ],
                order: [['createdAt', 'DESC']]
            })

            return res.json(orders)
        } catch (e) {
            next(e) 
        }
    }
}

module.exports = new OrderController()

