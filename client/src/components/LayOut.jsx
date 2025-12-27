import { Outlet } from "react-router-dom"
import Header from "./Header"
import '../styles/global.scss'
import MenuModal from "./modals/MenuModal"
import SearchModal from "./modals/SearchModal"
import { useMenuState } from "../store/useMenuState"
import { useSearchState } from "../store/useSearchState"
import { useSelectState } from "../store/useSelectState"
import { useSellerState } from "../store/useSellerState"
import { useToastState } from "../store/useToastState"
import { useCategoryState } from "../store/useCategoryState"
import FilterModal from "./modals/FilterModal"
import CenterModal from "./modals/CenterModal"
import { useModalState } from "../store/useModalState"
import { useEffect, useState } from "react"
import { auth } from "../http/userApi"
import { useProfileState } from "../store/useProfileState"
import { getCategories } from "../http/categoryApi"
import Loader from "./Loader"
import { useBasketState } from "../store/useBasketState"
import { getBasket } from "../http/basketApi"
import { getFavorites } from "../http/favoritesApi"
import { useFavoritesState } from "../store/useFavoritesState"
import { getSearchHistory } from "../http/searchHistoryApi"

function LayOut() {
    const [loading, setLoading] = useState(true)

    const setBasketProducts = useBasketState(state => state.setBasketProducts)

    const setFavoriteProducts = useFavoritesState(state => state.setFavoriteProducts)

    const role = useProfileState(state => state.role)

    const isMenuModalOpen = useMenuState(state => state.isMenuModalOpen)
    const setMenuModalClose = useMenuState(state => state.setMenuModalClose)

    const isSearchModalOpen = useSearchState(state => state.isSearchModalOpen)
    const closeSearchModal = useSearchState(state => state.closeSearchModal)
    const setSearchHistory = useSearchState(state => state.setSearchHistory)

    const isSelectModalOpen = useSelectState(state => state.isSelectModalOpen)
    const closeSelectModal = useSelectState(state => state.closeSelectModal)

    const isSellerInfoModalOpen = useSellerState(state => state.isSellerInfoModalOpen)
    const closeSellerInfoModal = useSellerState(state => state.closeSellerInfoModal)

    const isToastShow = useToastState(state => state.isToastShow)
    const message = useToastState(state => state.message)
    const toastDelete = useToastState(state => state.toastDelete)

    const centerModal = useModalState(state => state.centerModal)
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const isFilterModalOpen = useCategoryState(state => state.isFilterModalOpen)
    const closeFilterModal = useCategoryState(state => state.closeFilterModal)
    const setCategories = useCategoryState(state => state.setCategories)

    const cancelAction = useToastState(state => state.cancelAction);

    const setUser = useProfileState(state => state.setUser);


    function handleOverlay() {
        if (isMenuModalOpen) {
            setMenuModalClose()
        }
        if (isSearchModalOpen) {
            closeSearchModal()
        }
        if (isSelectModalOpen) {
            closeSelectModal()
        }
        if (isSellerInfoModalOpen) {
            closeSellerInfoModal()
        }
        if (centerModal !== '') {
            closeCenterModal()
        }
        if (isFilterModalOpen) {
            closeFilterModal()
        }
    }

    useEffect(() => {
        if (role) {
            getBasket().then(data => {
                setBasketProducts(data)            
            })
            getFavorites().then(data => {
                setFavoriteProducts(data)
            })
        }
    }, [role])
    
    useEffect(() => {
        auth().then(data => {
            setUser(data)
        }).catch(e => 
            e.message
        ).finally(
            getCategories().then(data => {
                setCategories(data)
            }).finally(() => 
                // getSearchHistory().then(data => {
                //     setSearchHistory(data)
                // }).finally(() => {
                //     setLoading(false)
                // })
                setLoading(false)

            )
        )
    }, [])

    if (loading) return <Loader load="app"/>

    return(
         <div onClick={handleOverlay}>
            <Header />
            {
                (isMenuModalOpen || isSearchModalOpen || centerModal !== '' || isFilterModalOpen) && 
                <div className="overlay"></div>
            }
            <MenuModal onClick={(e) => {e.stopPropagation(); e.preventDefault()}}/>
            <SearchModal onClick={(e) => {e.stopPropagation(); e.preventDefault()}}/>
            <CenterModal />
            <FilterModal />
            <main className="globalWrapper">
                <Outlet />
                <div className={`toast ${isToastShow ? 'toastShow' : ''}`}>
                    <p>
                        {message}
                        {toastDelete && <span onClick={() => cancelAction()}>cancel</span>}
                    </p>
                </div>
            </main>
        </div>
    )
}

export default LayOut;