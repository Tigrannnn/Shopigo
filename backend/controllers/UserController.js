const UserService = require('../service/UserService');
const {
    setTokenCookies,
    clearTokenCookies,
    setAccessTokenCookie
} = require('../utils/cookieUtils');


class UserController {
    async sendCode(req, res, next) {
        try{
            const body = req.body
            const { email } = await UserService.sendCode(body)
            return res.json({ email }) 
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try{
            const body = req.body
            const { accessToken, refreshToken } = await UserService.login(body)
            setTokenCookies(res, accessToken, refreshToken)
            return res.json({ accessToken })
        } catch (e) {
            next(e)
        }
    }

    async googleLogin(req, res, next) {
        try {
            const { token } = req.body
            const { accessToken, refreshToken, user } = await UserService.googleLogin(token)
            setTokenCookies(res, accessToken, refreshToken)
            return res.json({ accessToken, user })
        } catch (e) {
            console.error('Google login error:', e)
            next(e)
        }
    }

    async auth(req, res, next) {
        try{
            const { accessToken, user } = await UserService.auth(req.user.id)
            setAccessTokenCookie(res, accessToken)
            return res.json({ accessToken, user })
        } catch (e) {
            next(e)
        }
    }

    async changeInfo(req, res, next) {
        try {
            const userId = req.user.id
            const body = req.body

            const user = await UserService.changeInfo(userId, body)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async changeRole(req, res, next) {
        try {
            const { id } = req.params
            
            const user = await UserService.changeRole(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers(req.query)
            res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try{
            const { refreshToken } = req.cookies
            await UserService.logout(refreshToken)
            clearTokenCookies(res)
            return res.json({ message: 'Logged out' })
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try{
            const { refreshToken } = req.cookies
            const { accessToken, refreshToken: newRefreshToken } = await UserService.refresh(refreshToken)
            setTokenCookies(res, accessToken, newRefreshToken)
            return res.json({ accessToken })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()