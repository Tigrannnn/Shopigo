const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, name) => {
    return jwt.sign({ id, email, role, name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
}

class UserController {
    async login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await User.findOne({ where: { email } })
        if (user) {
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({ message: 'Invalid password' })
            }
            const token = generateJwt(user.id, user.email, user.role, user.name)
            return res.status(200).json({ token })
        } else {
            try {
                const hashPassword = await bcrypt.hash(password, 10)
                const newUser = await User.create({ email, password: hashPassword })
                // const basket = await Basket.create({ userId: newUser.id })
                const token = generateJwt(newUser.id, newUser.email, newUser.role, newUser.name)
                return res.status(200).json({ token })
            } catch (e) {
                console.log(e)
                return res.status(500).json({ message: e.message })
            }
        }
    }

    async auth(req, res) {
        console.log('hello')
    }
}

module.exports = new UserController()

