import { $authHost, $host } from './index.js'

export const createCategory = async (name) => {
    try {
        const body = {name}
        console.log(body);
        const {data} = await $authHost.post('/api/category', body)
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