const SearchService = require("../service/SearchService")

class SearchController {
    async getSearchHistory (req, res, next) {
        try {
            const userId = req.user.id
            const { searchValue } = req.query
            const searchHistory = await SearchService.getSearchHistory(userId, searchValue)
            return res.json(searchHistory)
        } catch (e) {
            next(e)
        }
    }

    async addSearchHistory (req, res, next) {
        try {
            const userId = req.user.id
            const { value } = req.body

            const newItem = await SearchService.addSearchHistory(userId, value)
            return res.json(newItem)
        } catch (e) {
            next(e)
        }
    }

    async removeSearchHistory (req, res, next) {
        try {
            const userId = req.user.id
            const { searchItemId } = req.body
            
            const deletedItem = await SearchService.removeSearchHistory(userId, searchItemId)
            return res.json(deletedItem)
        } catch (e) {
            next(e)
        }
    }

    async getSearchRecommended(req, res, next) {
        try {
            const { searchValue } = req.query
            const recommendations = await SearchService.getSearchRecommendations(searchValue)
            return res.json(recommendations)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SearchController()