const { Seller } = require('../models/models')
const ApiError = require('../exceptions/ApiError')

class SellerService {
    async getAll() {
        const sellers = await Seller.findAll()
        return sellers
    }

    async getById(id) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }
        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }
        return seller
    }

    async create(name, logo) {
        if (!name) {
            throw ApiError.BadRequest('Name is required')
        }

        if (!logo) {
            throw ApiError.BadRequest('Logo is required')
        }

        const existingSeller = await Seller.findOne({ where: { name } || { logo } })
        if (existingSeller) {
            throw ApiError.BadRequest('Seller with this name or logo already exists')
        }
        const seller = await Seller.create({ name, logo })
        return seller
    }

    async update(id, name, logo) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }

        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        if (name) {
            seller.name = name
        } else if (!name) {
            throw ApiError.BadRequest('Name is required')
        }

        if (logo) {
            seller.logo = logo
        } else if (!logo) {
            throw ApiError.BadRequest('Logo is required')
        }

        await seller.save()
        return seller
    }

    async delete(id) {
        if (!id) {
            throw ApiError.BadRequest('ID is required')
        }

        const seller = await Seller.findByPk(id)
        if (!seller) {
            throw ApiError.NotFound('Seller not found')
        }

        const productsInSeller = await Product.count({ where: { sellerId: id } })
        if (productsInSeller > 0) {
            throw ApiError.BadRequest('Cannot delete seller with associated products')
        }

        await seller.destroy()
        return { message: 'Seller deleted successfully' }
    }
}

module.exports = new SellerService()