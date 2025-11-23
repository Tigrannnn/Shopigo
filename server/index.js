require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        // alter: true добавляет недостающие колонки в существующие таблицы
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log('server', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()