const { User, Product, OrderProduct } = require('../models')

class AdminService {
    async getStats() {
        const users = await User.count()
        const products = await Product.count()
        const orders = await OrderProduct.count()

        const allOrders = await OrderProduct.findAll({
            attributes: ['price', 'quantity']
        })
        const revenue = allOrders.reduce((acc, order) => {
            return acc + (order.price * order.quantity)
        }, 0)

        return {
            users,
            products,
            orders,
            revenue
        }
    }
}

module.exports = new AdminService()