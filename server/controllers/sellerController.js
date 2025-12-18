const SellerService = require('../service/sellerService')

class SellerController {
    async getAll(req, res, next) {
        try {
            const sellers = await SellerService.getAll()
            res.json(sellers)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params

            const seller = await SellerService.getById(id)
            res.json(seller)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const { name } = req.body

            const seller = await SellerService.create(name)
            res.status(201).json(seller)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, logo } = req.body

            const updatedSeller = await SellerService.update(id, name, logo)
            res.json(updatedSeller)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await SellerService.delete(id)
            res.json({ message: 'Seller deleted successfully' })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SellerController()

