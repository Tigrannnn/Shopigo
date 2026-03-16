const OrderService = require('../service/OrderService.js')

class OrderController {
    async createOrder(req, res, next) {
        try {
            const userId = req.user.id
            const order = await OrderService.createOrder(userId)
            return res.status(201).json(order)
        } catch (e) {
            next(e)
        }
    }

    async createOrderDirect(req, res, next) {
        try {
            const userId = req.user.id
            const { productId, quantity } = req.body
            const order = await OrderService.createOrderDirect(userId, productId, quantity)
            return res.status(201).json(order)
        } catch (e) {
            next(e)
        }
    }

    async getOrders(req, res, next) {
        try {
            const userId = req.user.id
            const orders = await OrderService.getOrders(userId)
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await OrderService.getAllOrders()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async count(req, res, next) {
        try {
            const userId = req.user.id
            const count = await OrderService.count(userId)
            return res.json(count)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()

