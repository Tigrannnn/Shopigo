const sequelize = require('../db')
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
    article: {type: DataTypes.STRING, allowNull: false},
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

// UserFavoriteProduct
const Favorites = sequelize.define('favorites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavoriteProduct = sequelize.define('favoriteProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Associations
User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Favorites.hasMany(FavoriteProduct, { foreignKey: 'favoritesId' })
FavoriteProduct.belongsTo(Favorites, { foreignKey: 'favoritesId' })

Product.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(ColorVariant)
ColorVariant.belongsTo(Product)
Product.hasMany(SizeVariant)
SizeVariant.belongsTo(Product)

Product.belongsTo(Seller)
Seller.hasMany(Product)

BasketProduct.belongsTo(Product)
Product.hasMany(BasketProduct)

Product.belongsTo(Category)
Category.hasMany(Product)

Product.hasMany(ProductInfo, {as: 'productInfo'})
ProductInfo.belongsTo(Product)

Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Favorites)
Favorites.belongsTo(User)
Product.hasMany(Favorites)
Favorites.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

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
    FavoriteProduct
}