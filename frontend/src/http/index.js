import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

let onAuthFailedCallback = null

export const setAuthFailedCallback = (callback) => {
    onAuthFailedCallback = callback
}

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)


$authHost.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        const accessToken = localStorage.getItem('accessToken')

        if (error.response?.status === 401 && !originalRequest._retry && accessToken) {

            if (originalRequest.url?.includes('/logout') || originalRequest.url?.includes('/refresh')) {
                localStorage.removeItem('accessToken')
                return Promise.reject(error)
            }

            originalRequest._retry = true

            try {
                const { data } = await $host.get('/api/user/refresh')

                const { accessToken } = data

                localStorage.setItem('accessToken', accessToken)

                originalRequest.headers.authorization = `Bearer ${accessToken}`
                return $authHost(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem('accessToken')
                if (onAuthFailedCallback) {
                    onAuthFailedCallback()
                }
                console.error(refreshError)
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export {
    $host,
    $authHost,
}
