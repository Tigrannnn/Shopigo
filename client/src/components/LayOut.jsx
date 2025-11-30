import { Outlet } from "react-router-dom"
import Header from "./Header"
import '../styles/global.scss'
import MenuModal from "./MenuModal"
import SearchModal from "./SearchModal"
import { useMenuState } from "../store/useMenuState"
import { useSearchState } from "../store/useSearchState"
import { useCountrySelectState } from "../store/useCountrySelectState"
import { useSellerInfoState } from "../store/useSellerInfoState"
import { useToastState } from "../store/useToastState"
import { useCategoryState } from "../store/useCategoryState"
import FilterModal from "./FilterModal"
import CenterModal from "./CenterModal"
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

function LayOut() {
    const [loading, setLoading] = useState(true)

    const setBasketProducts = useBasketState(state => state.setBasketProducts)

    const setFavoriteProducts = useFavoritesState(state => state.setFavoriteProducts)

    const role = useProfileState(state => state.role)

    const isMenuModalOpen = useMenuState(state => state.isMenuModalOpen)
    const setMenuModalClose = useMenuState(state => state.setMenuModalClose)

    const isSearchModalOpen = useSearchState(state => state.isSearchModalOpen)
    const closeSearchModal = useSearchState(state => state.closeSearchModal)

    const isCountrySelectModalOpen = useCountrySelectState(state => state.isCountrySelectModalOpen)
    const closeCountrySelectModal = useCountrySelectState(state => state.closeCountrySelectModal)

    const isSellerInfoModalOpen = useSellerInfoState(state => state.isSellerInfoModalOpen)
    const closeSellerInfoModal = useSellerInfoState(state => state.closeSellerInfoModal)

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
        if (isCountrySelectModalOpen) {
            closeCountrySelectModal()
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
        auth().then(data => {
            setUser(data)
        }).catch(e => 
            e.message
        ).finally(
            getCategories().then(data => {
                setCategories(data)
            }).finally(() => setLoading(false))
        )
    }, [])

    useEffect(() => {
        if (role) {
            getBasket().then(data => {
                setBasketProducts(data)                
            })
            getFavorites().then(data => {
                setFavoriteProducts(data)
            })
        } else {
            setBasketProducts([])
            setFavoriteProducts([])
        }
    }, [role])
    

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