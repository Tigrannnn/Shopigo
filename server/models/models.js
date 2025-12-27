const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

// User
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})


// Seller
const Seller = sequelize.define('seller', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    reviews: {type: DataTypes.INTEGER, defaultValue: 0},
    productsSold: {type: DataTypes.INTEGER, defaultValue: 0},
    logo: {type: DataTypes.STRING},
})


// Category & SubCategory
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    icon: {type: DataTypes.STRING},
})


// Product & ProductInfo
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
    article: {type: DataTypes.STRING, allowNull: false, unique: true},
})
const ProductInfo = sequelize.define('productInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
})


// ColorVariant & SizeVariant
const ColorVariant = sequelize.define('colorVariant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})
const SizeVariant = sequelize.define('sizeVariant', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    size: {type: DataTypes.STRING, allowNull: false},
})


// Basket & BasketProduct
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
})
const BasketProduct = sequelize.define('basketProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    selected: {type: DataTypes.BOOLEAN, defaultValue: true},
})


// Order & OrderProduct
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, defaultValue: 'pending'},
})
const OrderProduct = sequelize.define('orderProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    color: {type: DataTypes.STRING},
    size: {type: DataTypes.STRING},
    images: {type: DataTypes.ARRAY(DataTypes.STRING)},
    deliveryDays: {type: DataTypes.INTEGER},
})


// Review
const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    comment: {type: DataTypes.TEXT, allowNull: false},
})


// User Favorites
const Favorites = sequelize.define('favorites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavoriteProduct = sequelize.define('favoriteProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


// User Recently Viewed
const RecentlyViewed = sequelize.define('recentlyViewed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const RecentlyViewedProduct = sequelize.define('recentlyViewedProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


// User Search History
const SearchHistory = sequelize.define('searchHistory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const SearchHistoryItem = sequelize.define('searchHistoryItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    search: {type: DataTypes.STRING}
})


// Token
const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})



// Token
Token.belongsTo(User)
User.hasOne(Token)


// Basket
User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

BasketProduct.belongsTo(Product)
Product.hasMany(BasketProduct)

// Favorites
User.hasOne(Favorites)
Favorites.belongsTo(User)

Favorites.hasMany(FavoriteProduct, { foreignKey: 'favoritesId' })
FavoriteProduct.belongsTo(Favorites, { foreignKey: 'favoritesId' })

Product.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Product)


// Orders
User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)


// ColorVariant & SizeVariant
Product.hasMany(ColorVariant)
ColorVariant.belongsTo(Product)
Product.hasMany(SizeVariant)
SizeVariant.belongsTo(Product)


// Category & Seller
Product.belongsTo(Category)
Category.hasMany(Product)

Product.belongsTo(Seller)
Seller.hasMany(Product)


// ProductInfo
Product.hasMany(ProductInfo, {as: 'productInfo'})
ProductInfo.belongsTo(Product)


// Review
Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)


// Recently Viewed
User.hasOne(RecentlyViewed)
RecentlyViewed.belongsTo(User)

RecentlyViewed.hasMany(RecentlyViewedProduct)
RecentlyViewedProduct.belongsTo(RecentlyViewed)

Product.hasMany(RecentlyViewedProduct)
RecentlyViewedProduct.belongsTo(Product)

// Search History
User.hasOne(SearchHistory)
SearchHistory.belongsTo(User)

SearchHistory.hasMany(SearchHistoryItem)
SearchHistoryItem.belongsTo(SearchHistory)

module.exports = {
    User,
    Seller,
    Category,
    Product,
    ProductInfo,
    ColorVariant,
    SizeVariant,
    Basket,
    BasketProduct,
    Order,
    OrderProduct,
    Review,
    Favorites,
    FavoriteProduct,
    RecentlyViewed,
    RecentlyViewedProduct,
    SearchHistory,
    SearchHistoryItem,
    Token,
}