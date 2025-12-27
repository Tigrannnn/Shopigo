import { $authHost, $host } from "./index.js";

export const createProduct = async (productData) => {
    try {
        const { name, price, description, rating, categoryId, sellerId, image } = productData
        const formData = new FormData()
        
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('rating', rating || 0)
        formData.append('categoryId', categoryId)
        formData.append('sellerId', sellerId)
        formData.append('image', image)
        
        const {data} = await $authHost.post('/api/product', formData)
        return data
    } catch (e) {
        console.log(e);
    }
}
 
export const getProducts = async ({categoryId, sellerId, search} = {}) => {
    try {
        const {data} = await $host.get('/api/product', {params: {sellerId, categoryId, search}})
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