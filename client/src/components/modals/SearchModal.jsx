import { useSearchState } from "../../store/useSearchState"
import cls from '../../styles/components/modals/SearchModal.module.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as HistoryIcon } from '../../assets/icons/history.svg';
import { useEffect } from 'react';

function SearchModal() {
    const isSearchModalOpen = useSearchState(state => state.isSearchModalOpen)
    const searchHistory = useSearchState(state => state.searchHistory)
    const removeFromSearchHistory = useSearchState(state => state.removeFromSearchHistory)
    const searchRecommended = useSearchState(state => state.searchRecommended)
    const closeSearchModal = useSearchState(state => state.closeSearchModal)
    const addToSearchHistory = useSearchState(state => state.addToSearchHistory)
    const inputValue = useSearchState(state => state.inputValue)
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSearchModalOpen) {
                if (e.key === 'Enter') {
                    addToSearchHistory(inputValue)
                    closeSearchModal()
                } else if (e.key === 'Escape') {
                    closeSearchModal()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isSearchModalOpen, inputValue, addToSearchHistory, closeSearchModal])

    const handleRemoveFromSearchHistory = (e, product) => {
        e.stopPropagation()
        e.preventDefault()
        removeFromSearchHistory(product)
    }

    return (
        <div className={`${cls.SearchModal} ${isSearchModalOpen ? cls.open : ''}`} onClick={(e) => e.stopPropagation()}>
            {
                searchHistory.length > 0 &&
                <div className={cls.searchItemWrapper}>
                    <h2>History</h2>
                {searchHistory.map((product) => {
                    return (
                        <div className={cls.searchItem} key={product.id} onClick={() => closeSearchModal()}>
                            <span>
                                <div className={cls.searchInfoWrapper}>
                                    <HistoryIcon />
                                    <p>{product.value}</p>
                                </div>
                                <button className={cls.trashButton} onClick={(e) => handleRemoveFromSearchHistory(e, product)}>
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
                    searchRecommended.map((product) => {
                        return (
                            <div className={cls.searchItem} key={product.id}>
                                <span>
                                    <div className={cls.searchInfoWrapper}>
                                        <SearchIcon />
                                        <p>{product.name}</p>
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