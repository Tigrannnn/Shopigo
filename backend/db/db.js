const { Sequelize } = require('sequelize');
const pg = require('pg');


const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction 
    ? new Sequelize(process.env.DB_URL, {
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    );

module.exports = sequelize;