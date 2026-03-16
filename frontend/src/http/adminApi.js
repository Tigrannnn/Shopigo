import { $authHost } from './index.js'
import handleApiError from './errorHandler'

export const getAdminStats = async () => {
    try {
        const { data } = await $authHost.get('/api/admin/stats')
        return data
    } catch (e) {
        handleApiError(e)
    }
}