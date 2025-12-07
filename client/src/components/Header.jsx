import cls from "../styles/components/Header.module.scss"
import { Link, useLocation } from "react-router-dom"
import { BASKET_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE } from "../utils/consts"
import { useMenuState } from "../store/useMenuState"
import { useSearchState } from "../store/useSearchState"
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as BasketIcon } from '../assets/icons/basket.svg';
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { useBasketState } from "../store/useBasketState"
import { useFavoritesState } from "../store/useFavoritesState"
import { ReactComponent as OrdersIcon } from '../assets/icons/orders.svg';
import { useOrderState } from "../store/useOrderState"
import { useRef, useEffect } from "react"
import { useProfileState } from "../store/useProfileState"

function Header() {
    const isMenuModalOpen = useMenuState(state => state.isMenuModalOpen)
    const setMenuModalToggle = useMenuState(state => state.setMenuModalToggle)
    const openSearchModal = useSearchState(state => state.openSearchModal)
    const isSearchModalOpen = useSearchState(state => state.isSearchModalOpen)
    const location = useLocation()
    const basketProducts = useBasketState(state => state.basketProducts)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const orderProducts = useOrderState(state => state.orderProducts)
    const role = useProfileState(state => state.role)
    const addToSearchHistory = useSearchState(state => state.addToSearchHistory)
    const inputValue = useSearchState(state => state.inputValue)
    const setInputValue = useSearchState(state => state.setInputValue)
    const searchInputRef = useRef(null)

    useEffect(() => {
        if (isSearchModalOpen) {
            searchInputRef.current?.focus()
        } else {
            searchInputRef.current?.blur()
        }
    }, [isSearchModalOpen])

    const isActiveRoute = (route) => {
        return location.pathname === route
    }

    const handleSearchInput = (e) => {
        e.stopPropagation()
        e.preventDefault()
        openSearchModal()
    }

    const handleSearchButton = () => {
        addToSearchHistory(inputValue)
    }

    return(
        <header className={cls.header}>
            <div className={cls.headerContainer}>
                {/* Logo and menu */}
                <div className={cls.leftSection}>
                    <Link to={SHOP_ROUTE} className={cls.logoLink}>
                        <h1 className={cls.logoText}>Shopigo</h1>
                    </Link>
                    
                    <button 
                        className={`${cls.menuButton} ${isMenuModalOpen ? cls.menuButtonActive : ''}`}
                        onClick={setMenuModalToggle}
                        aria-label="Toggle menu"
                    >
                        <span className={cls.menuLine}></span>
                        <span className={cls.menuLine}></span>
                        <span className={cls.menuLine}></span>
                    </button>
                </div>

                {/* Search */}
                <div className={cls.searchSection}>
                    <div className={cls.searchWrapper}>
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Find in Shopigo..." 
                            className={cls.searchInput}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onClick={handleSearchInput}
                        />
                        <button className={cls.searchButton} aria-label="Search">
                            <SearchIcon 
                                className={cls.searchIcon} 
                                fill="none" 
                                stroke="currentColor" 
                                onClick={handleSearchButton}
                            />
                        </button>
                    </div>
                </div>

                {/* User navigation */}
                <nav className={cls.userNavigation}>
                    <Link 
                        to={BASKET_ROUTE} 
                        className={`${cls.navItem} ${isActiveRoute(BASKET_ROUTE) ? cls.navItemActive : ''}`}
                    >
                        <div className={cls.navIconWrapper}>
                            <BasketIcon 
                                className={cls.navIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                            <span 
                                className={cls.notificationBadge} 
                                style={{display: basketProducts.length > 0 ? 'block' : 'none', fontSize: basketProducts.length > 99 ? '8px': '10px'}}
                            >
                                {basketProducts.length}
                            </span>
                        </div>
                        <span className={cls.navLabel}>Basket</span>
                    </Link>

                    <Link 
                        to={FAVORITES_ROUTE} 
                        className={`${cls.navItem} ${isActiveRoute(FAVORITES_ROUTE) ? cls.navItemActive : ''}`}
                    >
                        <div className={cls.navIconWrapper}>
                            <LikeIcon 
                                className={cls.navIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                            <span 
                                className={cls.notificationBadge} 
                                style={{display: favoriteProducts.length > 0 ? 'block' : 'none', fontSize: favoriteProducts.length > 99 ? '8px': '10px'}}
                            >
                                {favoriteProducts.length}
                            </span>
                        </div>
                        <span className={cls.navLabel}>Favorites</span>
                    </Link>
                    <Link 
                        to={ORDERS_ROUTE} 
                        className={`${cls.navItem} ${isActiveRoute(ORDERS_ROUTE) ? cls.navItemActive : ''}`}
                    >
                        <div className={cls.navIconWrapper}>
                            <OrdersIcon 
                                className={cls.navIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                            <span 
                                className={cls.notificationBadge} 
                                style={{display: orderProducts.length > 0 ? 'block' : 'none', fontSize: orderProducts.length > 99 ? '8px': '10px'}}
                            >
                                <p>{orderProducts.length}</p>
                            </span>
                        </div>
                        <span className={cls.navLabel}>Orders</span>
                    </Link>
                    <Link 
                        to={role ? PROFILE_ROUTE : LOGIN_ROUTE} 
                        className={`${cls.navItem} ${isActiveRoute(role ? PROFILE_ROUTE : LOGIN_ROUTE) ? cls.navItemActive : ''}`}
                    >
                        <div className={cls.navIconWrapper}>
                            <UserIcon 
                                className={cls.navIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                        </div>
                        <span className={cls.navLabel}>{role ? 'Profile' : 'Log In'}</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header