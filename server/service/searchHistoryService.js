// const { SearchHistory, SearchHistoryItem } = require("../models/models")

// class SearchHistoryService {
//     async getSearchHistory (userId) {
//         // Шаг 1: Найти запись SearchHistory для пользователя
//         let searchHistory = await SearchHistory.findOne({
//             where: { userId }
//         })
    
//         // Шаг 2: Если SearchHistory не найдена, создать её и вернуть пустой массив
//         if(!searchHistory){
//             await SearchHistory.create({ userId })
//             return [] // Новый пользователь не имеет истории поиска
//         }
    
//         // Шаг 3: Отдельный запрос для SearchHistoryItem (более надежный способ)
//         const items = await SearchHistoryItem.findAll({
//             where: { searchHistoryId: searchHistory.id },
//             order: [['createdAt', 'DESC']], // Последние запросы первыми
//             limit: 10 // Ограничиваем количество
//         })
        
//         // Шаг 4: Маппинг в формат для фронтенда
//         return items.map(item => ({
//             id: item.id,
//             value: item.search,
//             createdAt: item.createdAt
//         }))
//     }

//     async addSearchHistory (userId, search) {
//         let searchHistory = await SearchHistory.findOne({ where: { userId } })
//         if(!searchHistory){
//             searchHistory = await SearchHistory.create({ userId })
//         }

//         await SearchHistoryItem.create({searchHistoryId: searchHistory.id, search})
//         return { message: 'Search added to history successfully' }
//     }
// }

// module.exports = new SearchHistoryService()