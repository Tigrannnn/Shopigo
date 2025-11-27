import { $authHost, $host } from "./index.js";

export const createProduct = async () => {
    try {
        const {data} = await $authHost.post('/api/product')
        return data
    } catch (e) {
        return e.message
    }
}
 
export const getProducts = async () => {
    try {
        const {data} = await $host.get('/api/product')
        return data
    } catch (e) {
        return e.message
    }
}

export const getOneProduct = async (id) => {
    try {
        const {data} = await $host.get('/api/product/' + id)
        return data
    } catch (e) {
        return e.message
    }
}