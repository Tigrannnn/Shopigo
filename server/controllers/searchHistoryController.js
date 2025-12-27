// const searchHistoryService = require("../service/searchHistoryService")

// class SearchHistoryController {
//     async getSearchHistory (req, res, next) {
//         try {
//             const userId = req.user.id
//             const searchHistory = await searchHistoryService.getSearchHistory(userId)
//             return res.json(searchHistory)
//         } catch (e) {
//             next(e)
//         }
//     }

//     async addSearchHistory (req, res, next) {
//         try {
//             const userId = req.user.id
//             const { search } = req.body
            
//             await searchHistoryService.addSearchHistory(userId, search)
//             return res.json('Search added to history successfully')
//         } catch (e) {
//             next(e)
//         }
//     }
// }

// module.exports = new SearchHistoryController()