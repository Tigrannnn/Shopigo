import { $authHost, $host } from "./index.js";
import handleApiError from './errorHandler'
import { objectToFormData } from '@/utils/objectToFromData.js';

export const createSeller = async (seller) => {
    try {
        const formData = objectToFormData(seller);
        const {data} = await $authHost.post('/api/seller', formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getSellers = async () => {
    try {
        const {data} = await $host.get('/api/seller')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getOneSeller = async (id) => {
    try {
        const {data} = await $host.get('/api/seller/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const updateSeller = async (seller) => {
    try {
        const formData = objectToFormData(seller);
        const {data} = await $authHost.put('/api/seller/' + seller.id, formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const deleteSeller = async (id) => {
    try {
        const {data} = await $authHost.delete('/api/seller/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}