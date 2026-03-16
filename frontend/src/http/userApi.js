import { $authHost, $host } from './index.js'
import handleApiError from './errorHandler'

export const sendCode = async (email) => {
    try {
        const { data } = await $host.post('/api/user/sendCode', { email })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const login = async (email, inputCode) => {
    try {
        const { data } = await $host.post('/api/user/login', { email, inputCode })
        localStorage.setItem('accessToken', data.accessToken)
        return data.user
    } catch (e) {
        handleApiError(e)
    }
}

export const googleLogin = async (token) => {
    try {
        const { data } = await $host.post('/api/user/googleLogin', { token })
        localStorage.setItem('accessToken', data.accessToken)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const auth = async () => {
    try {
        const { data } = await $authHost.get('/api/user/auth')
        localStorage.setItem('accessToken', data.accessToken)
        return data.user
    } catch (e) {
        handleApiError(e)
    }
}

export const changeUserInfo = async (userData) => {
    try {
        const { data } = await $authHost.put('/api/user/changeInfo', userData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const changeUserRole = async (id) => {
    try {
        const { data } = await $authHost.put('/api/user/changeRole/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getUsers = async ({search, limit}) => {
    try {
        const { data } = await $authHost.get('/api/user/getUsers', {params: {search, limit}})
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const logout = async () => {
    try {
        localStorage.removeItem('accessToken')
        const { data } = await $host.get('/api/user/logout')
        return data
    } catch (e) {
        console.warn('Logout request failed, but token cleared')
    }
}