const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const Seller = sequelize.define('seller', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Seller

