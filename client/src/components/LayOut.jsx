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
import { useCenterModalState } from "../store/useCenterModalState"
import { useEffect, useState } from "react"
import { auth } from "../http/userApi"
import { useProfileState } from "../store/useProfileState"
import { ReactComponent as Loader } from '../assets/icons/loader.svg';
import { getCategories } from "../http/categoryApi"

function LayOut() {
    const [isAppLoading, setIsAppLoading] = useState(true)

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

    const centerModal = useCenterModalState(state => state.centerModal)
    const closeCenterModal = useCenterModalState(state => state.closeCenterModal)

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

    const randomDelay = 1
    // const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
    
    useEffect(() => {
        setTimeout(() => {
            auth().then(data => {
                setUser(data)
            }).catch(e => 
                e.message
            ).finally(() => {
                setIsAppLoading(false)
            })
            getCategories().then(data => {
                setCategories(data)
            })
        }, randomDelay);
    }, [])

    return(
         <div onClick={handleOverlay}>
            {
                isAppLoading &&
                <div className="loaderWrapper">
                    <div className="loader">
                        <Loader />
                    </div>
                </div>
            }
            {
                !isAppLoading && 
                <>
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
                </>
            }
        </div>
    )
}

export default LayOut;