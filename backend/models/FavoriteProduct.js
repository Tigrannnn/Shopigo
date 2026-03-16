const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const FavoriteProduct = sequelize.define('favoriteProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

module.exports = FavoriteProduct

