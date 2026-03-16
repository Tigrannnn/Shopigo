const ProductService = require('../service/ProductService')

class ProductController {
    async create(req, res, next) {
        try {
            const body = req.body
            const files = req.files

            const product = await ProductService.create(body, files)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            
            // Parse order parameter from query string
            // Can be: "createdAt,DESC" or ["createdAt", "DESC"] or [["createdAt", "DESC"]]
            let order = query.order
            
            if (order) {
                if (typeof order === 'string') {
                    // Parse string format: "createdAt,DESC" or "createdAt"
                    const parts = order.split(',').map(s => s.trim())
                    order = parts.length === 2 ? [parts] : [parts]
                } else if (Array.isArray(order) && !Array.isArray(order[0])) {
                    // Single order: ["createdAt", "DESC"]
                    order = [order]
                }
                // If already array of arrays, use as is
            }

            let seed = Number(query.seed)

            // Generate new seed on each fresh load: if client did not send seed (first request or F5), generate a new one
            if (!seed || isNaN(seed)) {
                seed = Math.floor(Math.random() * 1_000_000_000)
            }

            const products = await ProductService.getAll({ ...query, seed, order })
            return res.json({ products, seed })
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            
            const product = await ProductService.getById(id)
            return res.json(product)
        } catch (error) {
            console.error('Error getting product by ID:', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body
            const files = req.files

            const product = await ProductService.update(id, body, files)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const deletedProduct = await ProductService.delete(id)
            return res.json(deletedProduct)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()