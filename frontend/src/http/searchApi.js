import { $authHost, $host } from "./index"
import handleApiError from './errorHandler'

export const getSearchHistory = async (searchValue) => {
    try {
        const {data} = await $authHost.get('/api/search/history', { params: { searchValue } })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getSearchRecommended = async (searchValue) => {
    try {
        const {data} = await $host.get('/api/search/recommend', { params: { searchValue } })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const addSearchHistory = async (value) => {
    try {
        const body = { value }

        const {data} = await $authHost.post('/api/search/history', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const removeSearchHistory = async (searchItemId) => {
    try {
        const body = { searchItemId }

        const {data} = await $authHost.delete('/api/search/history', { data: body })
        return data
    } catch (e) {
        handleApiError(e)
    }
}