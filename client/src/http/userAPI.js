import { $authHost, $host } from './index.js'
import {jwtDecode} from 'jwt-decode'

export const login = async (email, password) => {
    const { data } = await $host.post('/api/user/login', { email, password })
    localStorage.setItem('token', data.accessToken)
    return jwtDecode(data.accessToken)
}

export const auth = async () => {
    const { data } = await $authHost.get('/api/user/auth')
    localStorage.setItem('token', data.accessToken)
    return jwtDecode(data.accessToken)
}