export const createProduct = async () => {
    try {
        const {data} = await $authHost.post('api/product')
        return data
    } catch (e) {
        return e.message
    }
}
 
export const fetchProducts = async () => {
    try {
        const {data} = await $host.post('api/product')
        return data
    } catch (e) {
        return e.message
    }
}