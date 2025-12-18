const UserService = require('../service/userService');

class UserController {
    async login(req, res, next) {
        try{
            const body = req.body

            const token = await UserService.login(body)
            return res.json({ token })
        } catch (e) {
            next(e)
        }
    }

    async auth(req, res, next) {
        try{
            const { token, user } = await UserService.auth(req.user)
            return res.json({ token, user })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()