const UserService = require('../service/userService');

class UserController {
    async sendCode(req, res, next) {
        try{
            const body = req.body
            const { email, serverCode } = await UserService.sendCode(body)
            return res.json({ email, serverCode })
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try{
            const body = req.body
            const { accessToken, refreshToken, user } = await UserService.login(body)
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json({ accessToken, refreshToken, user })
        } catch (e) {
            next(e)
        }
    }

    async auth(req, res, next) {
        try{
            const { accessToken, refreshToken, user } = await UserService.auth(req.user)
            return res.json({ accessToken, refreshToken, user })
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try{
            const { refreshToken } = req.cookies
            await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({ message: 'Logged out' })
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        // try{
        //     const { refreshToken } = req.cookies
        //     const { accessToken, refreshToken, user } = await UserService.refresh(refreshToken)
        //     return res.json({ accessToken, refreshToken, user })
        // } catch (e) {
        //     next(e)
        // }
        
    }
}

module.exports = new UserController()