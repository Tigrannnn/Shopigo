const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

module.exports = Token

