const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const SearchHistoryItem = sequelize.define('searchHistoryItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
})

module.exports = SearchHistoryItem

