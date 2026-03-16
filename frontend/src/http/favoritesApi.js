import { $authHost } from './index.js'
import handleApiError from './errorHandler'

export const getFavorites = async () => {
    try {
        const {data} = await $authHost.get('/api/favorites')
        return data
    } catch (e) {
        handleApiError(e)
    }
}
 
export const addFavoriteProduct = async (productId) => {
    try {
        const body = { productId }

        const {data} = await $authHost.post('/api/favorites', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const removeFavoriteProduct = async (productId) => {
    try {
        const {data} = await $authHost.delete('/api/favorites', { data: { productId } })
        return data
    } catch (e) {
        handleApiError(e)
    }
}


export const getFavoritesCount = async () => {
    try {
        const {data} = await $authHost.get('/api/favorites/count')
        return data
    } catch (e) {
        handleApiError(e)
    }
}
export const mergeFavorites = async (items) => {
    try {
        const { data } = await $authHost.post('/api/favorites/merge', { items });
        return data;
    } catch (e) {
        handleApiError(e);
    }
}
