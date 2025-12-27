import { $authHost } from './index.js'

export const getRecentlyViewed = async () => {
    try {
        const {data} = await $authHost.get('/api/recentlyViewed')
        const products = data.recentlyViewedProducts.map(recentlyViewedProduct => recentlyViewedProduct.product)
        return products
    } catch (e) {
        return e.message
    }
}
 
export const addRecentlyViewed = async (productId) => {
    try {
        const body = { productId }

        const {data} = await $authHost.post('/api/recentlyViewed', body)
        return data
    } catch (e) {
        return e.message
    }
}