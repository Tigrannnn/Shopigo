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
import { useProfileState } from "../store/useProfileState"
import { useCatalogState } from "../store/useCatalogState"
import FilterModal from "./FilterModal"
import CenterModal from "./CenterModal"

function LayOut() {
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

    const centerModal = useProfileState(state => state.centerModal)
    const closeCenterModal = useProfileState(state => state.closeCenterModal)

    const isFilterModalOpen = useCatalogState(state => state.isFilterModalOpen)
    const closeFilterModal = useCatalogState(state => state.closeFilterModal)

    const cancelAction = useToastState(state => state.cancelAction);


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
                <div className={`toast ${isToastShow ? 'toastShow' : ''}`}>
                    <p>
                        {message}
                        {toastDelete && <span onClick={() => cancelAction()}>cancel</span>}
                    </p>
                </div>
                <Outlet />
            </main>
        </div>
    )
}

export default LayOut;