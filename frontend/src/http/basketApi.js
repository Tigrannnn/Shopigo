import { $authHost } from './index.js'
import handleApiError from './errorHandler'

export const getBasket = async () => {
    try {
        const {data} = await $authHost.get('/api/basket')
        return data
    } catch (e) {
        handleApiError(e)
    }
}
 
export const addBasketProduct = async (productId) => {
    try {
        const body = { productId }

        const {data} = await $authHost.post('/api/basket', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const removeBasketProduct = async (productId) => {
    try {
        const {data} = await $authHost.delete('/api/basket', { data: { productId } })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const updateQuantity = async (basketProductId, quantity) => {
    try {
        const body = { basketProductId, quantity }

        const {data} = await $authHost.put('/api/basket/update-quantity', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const toggleSelected = async (basketProductId) => {
    try {
        const body = { basketProductId }
        const {data} = await $authHost.put('/api/basket/toggle-selected', body)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const toggleSelectAll = async () => {
    try{
        const {data} = await $authHost.put('/api/basket/select-all')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getBasketCount = async () => {
    try {
        const {data} = await $authHost.get('/api/basket/count')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const mergeBasket = async (items) => {
    try {
        const {data} = await $authHost.post('/api/basket/merge', { items })
        return data
    } catch (e) {
        handleApiError(e)
    }
}
