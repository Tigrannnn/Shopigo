// React and Router
import { useNavigate } from 'react-router-dom';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Profile.module.scss';

// Icons & Images
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';
import { ReactComponent as BasketIcon } from '@/assets/icons/basket.svg';
import { ReactComponent as OrdersIcon } from '@/assets/icons/orders.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as LogOutIcon } from '@/assets/icons/logout.svg';
import { ReactComponent as AdminIcon } from '@/assets/icons/admin.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useAuthQuery } from '@/hooks/query/useUsersQuery';
import { useGetBasketQuery } from '@/hooks/query/useBasketQuery';
import { useGetFavoritesQuery } from '@/hooks/query/useFavoritesQuery';
import { useGetOrdersQuery } from '@/hooks/query/useOrdersQuery';

// Utils
import { 
    ADMIN_ROUTE, 
    BASKET_ROUTE, 
    FAVORITES_ROUTE, 
    ORDERS_ROUTE 
} from '@/utils/constants/routes';

// Components
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import RecentlyViewed from '@/components/containers/RecentlyViewed/RecentlyViewed';
import Button from '@/components/ui/Button/Button';


function Profile() {
    // Router
    const navigate = useNavigate()

    // Get queries
    const { data: user } = useAuthQuery()
    const { data: basketProducts } = useGetBasketQuery()
    const { data: favoriteProducts } = useGetFavoritesQuery()
    const { data: orderProducts } = useGetOrdersQuery()

    // Modal
    const openModal = useModalState(state => state.openModal)

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Profile — Shopigo';
    const description = 'Manage your Shopigo profile, basket, favorites, and orders.';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/profile`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/profile`} />
            </Helmet>
            <div className={cls.Profile}>


                <aside className={cls.sidebar}>
                    <div className={cls.sidebarHeader}>
                        <div className={cls.userImageWrapper}>
                            <UserIcon className={cls.userImage} />
                        </div>
                        <div className={cls.profileUserNameWrapper}>
                            <h1 className={cls.profileUserName}>{user.name ?? 'Shopigo User'}</h1>
                        </div>
                    </div>
                    <Button className={cls.profileButton} variant='white' onClick={() => openModal('changeProfile')}>
                        <div className={cls.profileButtonIcon}>
                            <UserIcon width={"35px"}/>
                        </div>
                        <span>Change Profile</span>
                    </Button>
                    {
                        user.role === 'ADMIN' &&
                        <Button className={cls.profileButton} variant='white' onClick={() => navigate(ADMIN_ROUTE)}>
                            <div className={cls.profileButtonIcon}>
                                <AdminIcon width={"40px"}/>
                            </div>
                            <span>Admin Panel</span>
                        </Button>
                    }
                    <Button className={cls.profileButton} variant='white' onClick={() => openModal('logout')}>
                        <div className={cls.profileButtonIcon}>
                            <LogOutIcon width={"32px"}/>
                        </div>
                        <span>Log Out</span>
                    </Button>
                </aside>


                <section className={cls.mainSection}>

                    <div className={cls.userActivity}>
                        <div className={cls.userActivityButton} onClick={() => navigate(BASKET_ROUTE)}>
                            <div className={cls.infoWrapper}>
                                <h2 className={cls.title}>Basket</h2>
                                <p className={cls.description}>{basketProducts?.length} products</p>
                            </div>
                            <BasketIcon />
                        </div>
                        <div className={cls.userActivityButton} onClick={() => navigate(FAVORITES_ROUTE)}>
                            <div className={cls.infoWrapper}>
                                <h2 className={cls.title}>Favorites</h2>
                                <p className={cls.description}>{favoriteProducts?.length} products</p>
                            </div>
                            <LikeIcon />
                        </div>
                        <div className={cls.userActivityButton} onClick={() => navigate(ORDERS_ROUTE)}>
                            <div className={cls.infoWrapper}>
                                <h2 className={cls.title}>Orders</h2>
                                <p className={cls.description}>{orderProducts?.length} orders</p>
                            </div>
                            <OrdersIcon />
                        </div>
                    </div>
                    
                    <RecentlyViewed />

                </section>

            </div>
            <RecommendedBlock />
        </>
    )
}

export default Profile