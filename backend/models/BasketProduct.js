const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const BasketProduct = sequelize.define('basketProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
    selected: {type: DataTypes.BOOLEAN, defaultValue: true},
})

module.exports = BasketProduct