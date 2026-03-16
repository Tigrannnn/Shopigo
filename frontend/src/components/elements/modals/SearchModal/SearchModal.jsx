// React
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './SearchModal.module.scss';

// Icons
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg';
import { ReactComponent as HistoryIcon } from '@/assets/icons/history.svg';

// Hooks
import { useSearchState } from '@/store/useSearchState';
import { useToastState } from '@/store/useToastState';
import { useModalState } from '@/store/useModalState';
import { 
    useGetSearchHistoryQuery, 
    useAddToSearchHistory, 
    useRemoveFromSearchHistory, 
    useGetSearchRecommendedQuery 
} from '@/hooks/query/useSearchQuery';

// Components
import Loader from '@/components/ui/Loader/Loader';


function SearchModal() {
    // Router
    const navigate = useNavigate()

    // Toast
    const toast = useToastState(state => state.toast)

    // Search state
    const searchValue = useSearchState(state => state.searchValue)
    const setSearchValue = useSearchState(state => state.setSearchValue)

    // Modal
    const closeModal = useModalState(state => state.closeModal);

    // Get queries
    const { data: searchHistory, isLoading: isHistoryLoading } = useGetSearchHistoryQuery(searchValue)
    const { 
        data: searchRecommended, 
        isLoading: isRecLoading 
    } = useGetSearchRecommendedQuery(searchValue)

    // Mutation queries
    const { mutate: removeFromSearchHistory } = useRemoveFromSearchHistory()
    const { mutate: addToSearchHistory } = useAddToSearchHistory()

    // Filter out recommended items that are already in search history
    const historyNames = new Set(searchHistory?.map(item => item.value.toLowerCase()));
    const filteredRecommended = searchRecommended?.filter(item => !historyNames.has(item.name.toLowerCase()));


    // Handle search action
    const handleSearch = (searchValue) => {
        if (searchValue === '' || !searchValue) {
            toast('Please enter a search query')
        } else {
            const encoded = encodeURIComponent(searchValue)
            navigate(`search?search=${encoded}`)
            addToSearchHistory(searchValue)
            setSearchValue('')
            closeModal()
        }
    }

    // Handle removing item from search history
    const handleRemoveFromSearchHistory = (e, id) => {
        e.stopPropagation()
        e.preventDefault()
        removeFromSearchHistory(id)
    }

    return (
        <>
            {isHistoryLoading || isRecLoading ? (
                <Loader />
            ) : (
                <>
                    {searchHistory && searchHistory.length > 0 && (
                        <div className={cls.searchItemWrapper}>
                            <h3>History</h3>
                            {searchHistory.map((item) => (
                                <div className={cls.searchItem} key={item.id} onClick={() => handleSearch(item.value)}>
                                    <div className={cls.searchInfoWrapper}>
                                        <HistoryIcon />
                                        <p>{item.value}</p>
                                    </div>
                                    <TrashIcon 
                                        className={cls.trashIcon} 
                                        onClick={(e) => handleRemoveFromSearchHistory(e, item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredRecommended && filteredRecommended.length > 0 && (
                        <div className={cls.searchItemWrapper}>
                            <h3>Recommended</h3>
                            {filteredRecommended.map(({ id, name }) => (
                                <div className={cls.searchItem} key={id} onClick={() => handleSearch(name)}>
                                    <span>
                                        <div className={cls.searchInfoWrapper}>
                                            <SearchIcon />
                                            <p>{name}</p>
                                        </div>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {(!searchHistory || searchHistory.length === 0) &&
                     (!filteredRecommended || filteredRecommended.length === 0) && (
                        <div className={cls.searchItemWrapper}>
                            <p>No search history or recommendations found.</p>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default SearchModal 