import { $authHost } from './index.js'

export const getFavorites = async () => {
    try {
        const {data} = await $authHost.get('/api/favorites')
        const products = data.favoriteProducts.map(favoriteProduct => ({
            ...favoriteProduct.product,
            favoriteProductId: favoriteProduct.id
        }))
        return products
    } catch (e) {
        return e.message
    }
}
 
export const addFavoriteProduct = async (productId) => {
    try {
        const body = { productId }

        const {data} = await $authHost.post('/api/favorites', body)
        return data
    } catch (e) {
        return e.message
    }
}

export const removeFavoriteProduct = async (productId) => {
    try {
        const {data} = await $authHost.delete('/api/favorites', { data: { productId } })
        return data
    } catch (e) {
        return e.message
    }
}