const { Seller } = require('../models/models')

class SellerController {
    async getAll(req, res) {
        try {
            const sellers = await Seller.findAll()
            res.json(sellers)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getById(req, res) {
        try {
            const seller = await Seller.findByPk(req.params.id)
            if (seller) {
                res.json(seller)
            } else {
                res.status(404).json({ message: 'Seller not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async create(req, res) {
        try {
            const seller = await Seller.create(req.body)
            res.status(201).json(seller)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async update(req, res) {
        try {
            const seller = await Seller.findByPk(req.params.id)
            if (seller) {
                await seller.update(req.body)
                res.json(seller)
            } else {
                res.status(404).json({ message: 'Seller not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async delete(req, res) {
        try {
            const seller = await Seller.findByPk(req.params.id)
            if (seller) {
                await seller.destroy()
                res.json({ message: 'Seller deleted successfully' })
            } else {
                res.status(404).json({ message: 'Seller not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new SellerController()

