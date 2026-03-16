// React
import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Styles
import cls from './Header.module.scss';

// Icons
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
import { ReactComponent as BasketIcon } from '@/assets/icons/basket.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';
import { ReactComponent as OrdersIcon } from '@/assets/icons/orders.svg';

// Hooks
import { useAuthQuery } from '@/hooks/query/useUsersQuery';
import { useGetBasketQuery } from '@/hooks/query/useBasketQuery';
import { useGetFavoritesQuery } from '@/hooks/query/useFavoritesQuery';
import { useGetOrdersQuery } from '@/hooks/query/useOrdersQuery';
import { useAddToSearchHistory, useGetSearchHistoryQuery, useGetSearchRecommendedQuery } from '@/hooks/query/useSearchQuery';
import { useSearchState } from '@/store/useSearchState';
import { useToastState } from '@/store/useToastState';
import { useIsActiveRoute } from '@/utils/isActiveRoute';
import { useModalState } from '@/store/useModalState';

// Utils
import { BASKET_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE } from '@/utils/constants/routes';
import { MODALS } from '@/utils/constants/modals';
import { useGetCategoryQuery } from '@/hooks/query/useCategoryQuery';


function Header() {
    // Router
    const location = useLocation();
    const navigate = useNavigate();
    const isActiveRoute = useIsActiveRoute();

    // Search
    const searchValue = useSearchState(state => state.searchValue)
    const setSearchValue = useSearchState(state => state.setSearchValue)

    // Read search term from URL and keep it human‑readable in the header input
    const params = new URLSearchParams(location.search)
    const search = params.get('search') || ''
    const searchInputRef = useRef(null)
    
    // Get queries
    const { data: user } = useAuthQuery()
    const { data: basketProducts } = useGetBasketQuery()
    const { data: favoriteProducts } = useGetFavoritesQuery()
    const { data: orderProducts } = useGetOrdersQuery()
    useGetCategoryQuery()
    useGetSearchHistoryQuery()
    useGetSearchRecommendedQuery()
    
    // Mutation queries
    const { mutate: addToSearchHistory } = useAddToSearchHistory()

    // Toast
    const toast = useToastState(state => state.toast)

    // Modal
    const activeModal = useModalState(state => state.activeModal)
    const openModal = useModalState(state => state.openModal)
    const closeModal = useModalState(state => state.closeModal)
    const isMenuModalOpen = activeModal === MODALS.CATEGORY_MODAL
    const isSearchModalOpen = activeModal === MODALS.SEARCH_MODAL

    // Hide header on scroll down, show on scroll up
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);


    // Handle search input click
    const handleSearchInput = (e) => {
        e.stopPropagation();
        e.preventDefault();
        openModal(MODALS.SEARCH_MODAL);
    };

    // Handle search action
    const handleSearch = useCallback((searchValue) => {
        if (searchValue === '') {
            toast('Please enter a search query')
            return
        } else {
            addToSearchHistory(searchValue)
            const encoded = encodeURIComponent(searchValue)
            navigate(`search?search=${encoded}`)
            closeModal()
        }
    }, [toast, addToSearchHistory, navigate, closeModal])

    // Handle burger menu click
    const handleMenuClick = (e) => {
        // prevent the click from bubbling up to the document listener
        e.stopPropagation();

        if (isMenuModalOpen) {
            closeModal();
        } else {
            openModal(MODALS.CATEGORY_MODAL);
        }
    };

    // Control header visibility on scroll
    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlHeader);

        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);


    // Set search value from URL on component mount and when URL changes
    useEffect(() => {
        if (search) {
            setSearchValue(search)
        }
    }, [search, setSearchValue])


    // Handle keyboard events for search modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSearchModalOpen) {
                if (e.key === 'Enter') {
                    handleSearch(searchValue)
                } else if (e.key === 'Escape') {
                    closeModal()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isSearchModalOpen, searchValue, closeModal, handleSearch])

    return(
        <header className={`${cls.header} ${!isVisible ? cls.headerHidden : ''}`}>
                {/* Logo and menu */}
                <div className={cls.logoSection}>
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
                            <div 
                                className={cls.notificationBadge} 
                                style={{display: favoriteProducts?.length > 0 ? 'block' : 'none' }}
                            >
                                <span>{favoriteProducts?.length}</span>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to={SHOP_ROUTE} className={cls.logoLink}>Shopigo</Link>
                    
                    <button 
                        className={`${cls.menuButton} ${isMenuModalOpen ? cls.menuButtonActive : ''}`}
                        onClick={handleMenuClick}
                        onMouseDown={(e) => e.stopPropagation()} // also stop mousedown
                        data-modal-trigger
                        aria-label="Toggle menu"
                    >
                        <span className={cls.menuLine}></span>
                        <span className={cls.menuLine}></span>
                        <span className={cls.menuLine}></span>
                    </button>
                </div>

                {/* Search */}
                <div className={cls.searchSection}>
                    <div className={cls.searchInputWrapper}>
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Find in Shopigo..." 
                            className={cls.searchInput}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onClick={handleSearchInput}
                            onMouseDown={(e) => e.stopPropagation()}
                            data-modal-trigger
                        />
                        <button 
                            className={cls.searchButton}
                            aria-label="Search"
                            onClick={() => handleSearch(searchValue)}
                            onMouseDown={(e) => e.stopPropagation()}
                            data-modal-trigger
                        >
                            <SearchIcon 
                                className={cls.searchIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                        </button>
                    </div>
                </div>

                {/* User navigation */}
                <nav className={cls.navigationSection}>
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
                            <div 
                                className={cls.notificationBadge} 
                                style={{display: basketProducts?.length > 0 ? 'block' : 'none' }}
                            >
                                <span>{basketProducts?.length}</span>
                            </div>
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
                            <div 
                                className={cls.notificationBadge} 
                                style={{display: favoriteProducts?.length > 0 ? 'block' : 'none' }}
                            >
                                <span>{favoriteProducts?.length}</span>
                            </div>
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
                            <div 
                                className={cls.notificationBadge} 
                                style={{display: orderProducts?.length > 0 ? 'block' : 'none' }}
                            >
                                <span>{orderProducts?.length}</span>
                            </div>
                        </div>
                        <span className={cls.navLabel}>Orders</span>
                    </Link>
                    <Link 
                        to={user ? PROFILE_ROUTE : LOGIN_ROUTE} 
                        className={`${cls.navItem} ${isActiveRoute(user ? PROFILE_ROUTE : LOGIN_ROUTE) ? cls.navItemActive : ''}`}
                    >
                        <div className={cls.navIconWrapper}>
                            <UserIcon 
                                className={cls.navIcon} 
                                fill="none" 
                                stroke="currentColor" 
                            />
                        </div>
                        <span className={cls.navLabel}>{user ? 'Profile' : 'Log In'}</span>
                    </Link>
                </nav>
        </header>
    )
}

export default Header