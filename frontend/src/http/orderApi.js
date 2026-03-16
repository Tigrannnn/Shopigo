import { $authHost } from "./index.js"
import handleApiError from "./errorHandler"

export const createOrder = async () => {
    try {
        const {data} = await $authHost.post('/api/order')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const createOrderDirect = async (productId, quantity = 1) => {
    try {
        const {data} = await $authHost.post('/api/order/direct', { productId, quantity })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getOrders = async () => {
    try {
        const {data} = await $authHost.get('/api/order')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getAllOrders = async () => {
    try {
        const {data} = await $authHost.get('/api/order/all')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getOrdersCount = async () => {
    try {
        const {data} = await $authHost.get('/api/order/count')
        return data
    } catch (e) {
        handleApiError(e)
    }
}