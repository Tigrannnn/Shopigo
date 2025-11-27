const { Basket, BasketProduct, User, Product } = require('../models/models')

class BasketController {
    async getAll(req, res) {
        console.log("hello");
    }

    async getById(req, res) {
        console.log("hello");
    }
}

module.exports = new BasketController()

