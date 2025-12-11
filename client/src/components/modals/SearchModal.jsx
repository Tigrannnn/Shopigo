import { useSearchState } from "../../store/useSearchState"
import cls from '../../styles/components/modals/SearchModal.module.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as HistoryIcon } from '../../assets/icons/history.svg';
import { useSearch } from "../../hooks/useSearch"

function SearchModal() {
    const isSearchModalOpen = useSearchState(state => state.isSearchModalOpen)
    const searchHistory = useSearchState(state => state.searchHistory)
    const removeFromSearchHistory = useSearchState(state => state.removeFromSearchHistory)
    const searchRecommended = useSearchState(state => state.searchRecommended)

    const handleSearch = useSearch()

    const handleRemoveFromSearchHistory = (e, item) => {
        e.stopPropagation()
        e.preventDefault()
        removeFromSearchHistory(item)
    }

    return (
        <div className={`${cls.SearchModal} ${isSearchModalOpen ? cls.open : ''}`} onClick={(e) => e.stopPropagation()}>
            {
                searchHistory.length > 0 &&
                <div className={cls.searchItemWrapper}>
                    <h2>History</h2>
                    {searchHistory.map((item) => {
                        return (
                            <div className={cls.searchItem} key={item.id} onClick={() => handleSearch(item.value)}>
                                <span>
                                    <div className={cls.searchInfoWrapper}>
                                        <HistoryIcon />
                                        <p>{item.value}</p>
                                    </div>
                                    <button className={cls.trashButton} onClick={(e) => handleRemoveFromSearchHistory(e, item)}>
                                        <TrashIcon className={cls.trashIcon} />
                                    </button>
                                </span>
                            </div>
                        )
                    })}
            </div>
            }
            <div className={cls.searchItemWrapper}>
                <h2>Recommended</h2>
                {
                    searchRecommended.map((item) => {
                        return (
                            <div 
                                className={cls.searchItem} 
                                key={item.id} 
                                onClick={() => handleSearch(item.name)}
                            >
                                <span>
                                    <div className={cls.searchInfoWrapper}>
                                        <SearchIcon />
                                        <p>{item.name}</p>
                                    </div>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchModal 