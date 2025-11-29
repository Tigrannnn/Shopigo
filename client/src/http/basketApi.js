import { $authHost } from './index.js'

export const getBasket = async () => {
    try {
        const {data} = await $authHost.get('/api/basket')
        const products = data.basketProducts.map(basketProduct => ({
            ...basketProduct.product,
            quantity: basketProduct.quantity,
            basketProductId: basketProduct.id
        }))
        return products
    } catch (e) {
        return e.message
    }
}
 
export const addBasketProduct = async (productId, quantity = 1) => {
    try {
        const body = { productId, quantity }

        const {data} = await $authHost.post('/api/basket', body)
        return data
    } catch (e) {
        return e.message
    }
}

export const removeBasketProduct = async (productId) => {
    try {
        const {data} = await $authHost.delete('/api/basket', { data: { productId } })
        return data
    } catch (e) {
        return e.message
    }
}

export const updateQuantityBasketProduct = async (productId, quantity) => {
    try {
        const body = { productId, quantity }

        const {data} = await $authHost.put('/api/basket', body)
        return data
    } catch (e) {
        return e.message
    }
}