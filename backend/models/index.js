const User = require('./User')
const Seller = require('./Seller')
const Category = require('./Category')
const Product = require('./Product')
const BasketProduct = require('./BasketProduct')
const OrderProduct = require('./OrderProduct')
const FavoriteProduct = require('./FavoriteProduct')
const RecentlyViewedProduct = require('./RecentlyViewedProduct')
const SearchHistoryItem = require('./SearchHistoryItem')
const Token = require('./Token')

// Token
Token.belongsTo(User)
User.hasOne(Token)

// Basket
User.hasMany(BasketProduct)
BasketProduct.belongsTo(User)

BasketProduct.belongsTo(Product)
Product.hasMany(BasketProduct)

// Favorites
User.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(User)

Product.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Product)

// Orders

OrderProduct.belongsTo(User)
User.hasMany(OrderProduct)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

// Category & Seller
Product.belongsTo(Category)
Category.hasMany(Product)

Product.belongsTo(Seller)
Seller.hasMany(Product)

// Recently Viewed
User.hasMany(RecentlyViewedProduct)
RecentlyViewedProduct.belongsTo(User)

Product.hasMany(RecentlyViewedProduct)
RecentlyViewedProduct.belongsTo(Product)

// Search History
User.hasMany(SearchHistoryItem)
SearchHistoryItem.belongsTo(User)

module.exports = {
    User,
    Seller,
    Category,
    Product,
    BasketProduct,
    OrderProduct,
    FavoriteProduct,
    RecentlyViewedProduct,
    SearchHistoryItem,
    Token,
}

