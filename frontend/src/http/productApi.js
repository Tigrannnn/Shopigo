import { $authHost, $host } from "./index.js";
import handleApiError from './errorHandler'
import { objectToFormData } from "@/utils/objectToFromData.js";

export const createProduct = async (product) => {
    try {
        const formData = objectToFormData(product);
        const {data} = await $authHost.post('/api/product', formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}
 
export const getProducts = async ({ categoryId, sellerId, search, limit, page, order, seed } = {}) => {
    try {
        const { data } = await $host.get('/api/product', {
            params: { sellerId, categoryId, search, limit, page, seed, order }
        })
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getOneProduct = async (id) => {
    try {
        const {data} = await $host.get('/api/product/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const updateProduct = async (product) => {
    try {
        const formData = objectToFormData(product);
        const {data} = await $authHost.put('/api/product/' + product.id, formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const deleteProduct = async (id) => {
    try {
        const {data} = await $authHost.delete('/api/product/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}