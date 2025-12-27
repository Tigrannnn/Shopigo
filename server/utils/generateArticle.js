const { Product } = require('../models/models')

const generateArticle = async () => {
    const lastProduct = await Product.findOne({
        order: [['id', 'DESC']]
    })
    
    let nextNumber = 100000
    
    if (lastProduct) {
        const lastArticle = parseInt(lastProduct.article) || 99999
        nextNumber = lastArticle + 1
    }
    
    let article = nextNumber.toString()
    let exists = await Product.findOne({ where: { article } })
    
    while (exists) {
        nextNumber++
        article = nextNumber.toString()
        exists = await Product.findOne({ where: { article } })
    }
    
    return article
}

module.exports = generateArticle