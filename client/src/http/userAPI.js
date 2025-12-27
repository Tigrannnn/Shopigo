import { $authHost, $host } from './index.js'

export const sendEmail = async (email) => {
    const { data } = await $host.post('/api/user/sendCode', { email })
    return data
}

export const login = async (email, inputCode) => {
    const { data } = await $host.post('/api/user/login', { email, inputCode })
    localStorage.setItem('accessToken', data.accessToken)
    return data.user
}

export const auth = async () => {
    const { data } = await $authHost.get('/api/user/auth')
    localStorage.setItem('accessToken', data.accessToken)
    return data.user
}