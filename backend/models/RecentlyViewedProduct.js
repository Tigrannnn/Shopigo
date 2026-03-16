const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const RecentlyViewedProduct = sequelize.define('recentlyViewedProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

module.exports = RecentlyViewedProduct

