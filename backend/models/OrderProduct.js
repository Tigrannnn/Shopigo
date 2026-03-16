const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const OrderProduct = sequelize.define('orderProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    size: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: 'pending'},
})

module.exports = OrderProduct

