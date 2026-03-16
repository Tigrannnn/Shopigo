const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(80), allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    description: {type: DataTypes.STRING(1100), allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
    article: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})

module.exports = Product

