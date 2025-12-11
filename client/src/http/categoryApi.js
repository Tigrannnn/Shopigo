import { $authHost, $host } from './index.js'

export const createCategory = async (name, icon) => {
    try {
        const body = {name, icon}
        const formData = new FormData()
        formData.append('name', name)
        formData.append('icon', icon)
        const {data} = await $authHost.post('/api/category', formData)
        return data
    } catch (e) {
        return e.message
    }
}
 
export const getCategories = async () => {
    try {
        const {data} = await $host.get('/api/category')
        return data
    } catch (e) {
        return e.message
    }
}

export const getOneCategory = async (id) => {
    try {
        const {data} = await $host.get('/api/category/' + id)
        return data
    } catch (e) {
        return e.message
    }
}