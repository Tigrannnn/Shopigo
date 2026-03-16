import { $authHost } from './index.js'
import handleApiError from './errorHandler'

export const getRecentlyViewed = async () => {
    try {
        const {data} = await $authHost.get('/api/recentlyViewed')
        return data
    } catch (e) {
        handleApiError(e)
    }
}
 
export const addRecentlyViewed = async (productId) => {
    try {
        const body = { productId }

        const {data} = await $authHost.post('/api/recentlyViewed', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}
export const mergeRecentlyViewed = async (items) => {
    try {
        const { data } = await $authHost.post('/api/recentlyViewed/merge', { items });
        return data;
    } catch (e) {
        handleApiError(e);
    }
}
