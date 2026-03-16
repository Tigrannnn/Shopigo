// React
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Styles
import cls from './MobileNavigation.module.scss';

// Icons
import { ReactComponent as BasketIcon } from '@/assets/icons/basket.svg';
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';
import { ReactComponent as OrdersIcon } from '@/assets/icons/orders.svg';
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as FavoritesIcon } from '@/assets/icons/like.svg';

// Hooks
import { useAuthQuery } from '@/hooks/query/useUsersQuery';
import { useGetBasketQuery } from '@/hooks/query/useBasketQuery';
import { useGetOrdersQuery } from '@/hooks/query/useOrdersQuery';
import { useIsActiveRoute } from '@/utils/isActiveRoute';
import { useGetFavoritesQuery } from '@/hooks/query/useFavoritesQuery';

// Utils
import {
    BASKET_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    PROFILE_ROUTE,
    SHOP_ROUTE,
    FAVORITES_ROUTE
} from '@/utils/constants/routes';


function MobileNavigation() {
    // Router
    const isActiveRoute = useIsActiveRoute();

    // Get queries
    const { data: user } = useAuthQuery()
    const { data: basketProducts } = useGetBasketQuery()
    const { data: orderProducts } = useGetOrdersQuery()
    const { data: favoriteProducts } = useGetFavoritesQuery()

    // Hide navigation on scroll down, show on scroll up
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Control navigation visibility on scroll
    useEffect(() => {
        const controlNavigation = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavigation);

        return () => {
            window.removeEventListener('scroll', controlNavigation);
        };
    }, [lastScrollY]);

    return (
        <div className={`${cls.MobileNavigation} ${!isVisible ? cls.navHidden : ''}`}>
            <Link
                to={SHOP_ROUTE}
                className={`${cls.navItem} ${isActiveRoute(SHOP_ROUTE) ? cls.navItemActive : ''}`}
            >
                <div className={cls.navIconWrapper}>
                    <HomeIcon 
                        className={cls.navIcon} 
                        fill="none" 
                        stroke="currentColor" 
                    />
                </div>
            </Link>
            
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
            </Link>

            <Link
                to={FAVORITES_ROUTE}
                className={`${cls.navItem} ${isActiveRoute(FAVORITES_ROUTE) ? cls.navItemActive : ''}`}
            >
                <div className={cls.navIconWrapper}>
                    <FavoritesIcon 
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
            </Link>
        </div>
    )
}

export default MobileNavigation