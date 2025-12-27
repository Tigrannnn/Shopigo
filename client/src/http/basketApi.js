import { $authHost } from './index.js'

export const getBasket = async () => {
    try {
        const {data} = await $authHost.get('/api/basket')
        const products = data.basketProducts.map(basketProduct => ({
            ...basketProduct.product,
            quantity: basketProduct.quantity,
            selected: basketProduct.selected,
        }))
        return products
    } catch (e) {
        return e.message
    }
}
 
export const addBasketProduct = async (productId, quantity = 1, selected = true) => {
    try {
        const body = { productId, quantity, selected }

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

export const updateQuantity = async (productId, quantity) => {
    try {
        const body = { productId, quantity }

        const {data} = await $authHost.put('/api/basket/update-quantity', body)
        return data
    } catch (e) {
        return e.message
    }
}

export const toggleSelected = async (productId) => {
    try {
        const body = { productId }
        const {data} = await $authHost.put('/api/basket/toggle-selected', body)
        return data
    } catch (e) {
        console.error('Error toggling selected basket product:', e)
        return e.message
    }
}

export const toggleSelectAll = async () => {
    try{
        const {data} = await $authHost.put('/api/basket/select-all')
        return data
    } catch (e) {
        return e.message
    }
}