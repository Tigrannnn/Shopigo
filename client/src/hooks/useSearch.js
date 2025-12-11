import { useNavigate } from 'react-router-dom'
import { useSearchState } from '../store/useSearchState'
import { useToastState } from '../store/useToastState'

export const useSearch = () => {
    const navigate = useNavigate()
    const toast = useToastState(state => state.toast)
    const inputValue = useSearchState(state => state.inputValue)
    const addToSearchHistory = useSearchState(state => state.addToSearchHistory)
    const setInputValue = useSearchState(state => state.setInputValue)
    const closeSearchModal = useSearchState(state => state.closeSearchModal)

    const handleSearch = (searchValue = null) => {
        const query = searchValue !== null ? searchValue : inputValue

        if (query === '') {
            toast('Please enter a search query')
        } else {
            addToSearchHistory(query)
            navigate(`search?search=${query}`)
            setInputValue('')
            closeSearchModal()
        }
    }

    return handleSearch
}