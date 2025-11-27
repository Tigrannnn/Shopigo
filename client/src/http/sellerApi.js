import { $authHost, $host } from "./index.js";

export const createSeller = async () => {
    try {
        const {data} = await $authHost.post('/api/seller')
        return data
    } catch (e) {
        return e.message
    }
}
 
export const getSellers = async () => {
    try {
        const {data} = await $host.get('/api/seller')
        return data
    } catch (e) {
        return e.message
    }
}

export const getOneSeller = async (id) => {
    try {
        const {data} = await $host.get('/api/seller/' + id)
        return data
    } catch (e) {
        return e.message
    }
}