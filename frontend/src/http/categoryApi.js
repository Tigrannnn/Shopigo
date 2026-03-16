import { $authHost, $host } from './index.js'
import handleApiError from './errorHandler'
import { objectToFormData } from '@/utils/objectToFromData.js';

export const createCategory = async (category) => {
    try {
        const formData = objectToFormData(category);
        const {data} = await $authHost.post('/api/category', formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}
 
export const getCategories = async () => {
    try {
        const {data} = await $host.get('/api/category')
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const getOneCategory = async (id) => {
    try {
        const {data} = await $host.get('/api/category/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const updateCategory = async (category) => {
    try {
        const formData = objectToFormData(category);
        const {data} = await $authHost.put('/api/category/' + category.id, formData)
        return data
    } catch (e) {
        handleApiError(e)
    }
}

export const deleteCategory = async (id) => {
    try {
        const {data} = await $authHost.delete('/api/category/' + id)
        return data
    } catch (e) {
        handleApiError(e)
    }
}