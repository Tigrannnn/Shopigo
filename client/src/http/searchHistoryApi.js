// import { $authHost } from "./index"

// export const getSearchHistory = async () => {
//     try {
//         const {data} = await $authHost.get('/api/searchHistory')
//         // Контроллер возвращает массив напрямую, не объект с searchHistoryItem
//         return data // data уже массив объектов {id, value, createdAt}
//     } catch (e) {
//         console.error('Error getting search history:', e)
//         return []
//     }
// }

// export const addSearchHistory = async (search) => {
//     try {
//         const body = { search }

//         const {data} = await $authHost.post('/api/searchHistory', body)
//         return data
//     } catch (e) {
//         return e.message
//     }
// }