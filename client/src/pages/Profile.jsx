import cls from "../styles/pages/Profile.module.scss"
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { useFavoritesState } from '../store/useFavoritesState';
import { useOrderState } from '../store/useOrderState';
import { useBasketState } from '../store/useBasketState';
import { ReactComponent as BasketIcon } from '../assets/icons/basket.svg';
import { ReactComponent as OrdersIcon } from '../assets/icons/orders.svg';
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg';
import { ADMIN_ROUTE, BASKET_ROUTE, FAVORITES_ROUTE, ORDERS_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';
import { ReactComponent as CreditCardIcon } from '../assets/icons/creditCard.svg';
import { ReactComponent as LogOutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as AdminIcon } from '../assets/icons/admin.svg';
import { useModalState } from "../store/useModalState";
import ProductCard from "../components/ProductCard";
import { useRecentlyViewedState } from "../store/useRecentlyViewedState";
import { useEffect, useState } from 'react'
import { useProfileState } from "../store/useProfileState";
import { getRecentlyViewed } from "../http/recentlyViewedApi";
import Loader from "../components/Loader";

function Profile() {
    const name = useProfileState(state => state.name)
    const role = useProfileState(state => state.role)
    const balance = useProfileState(state => state.balance)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const orderProducts = useOrderState(state => state.orderProducts)
    const basketProducts = useBasketState(state => state.basketProducts)

    const [loading, setLoading] = useState(true)

    const recentlyViewed = useRecentlyViewedState(state => state.recentlyViewed)
    const setRecentlyViewed = useRecentlyViewedState(state => state.setRecentlyViewed)

    const navigate = useNavigate()

    const openCenterModal = useModalState(state => state.openCenterModal)

    useEffect(() => {
        document.title = 'Profile'
        getRecentlyViewed().then(data => {
            setRecentlyViewed(data)
        }).finally(() => setLoading(false))
    }, [])


    if (loading) return <Loader/>

    return (
        <div className={cls.Profile}>


            <aside className={cls.sidebar}>
                <div className={cls.sidebarHeader}>
                    <div className={cls.userIconWrapper}>
                        <UserIcon className={cls.userIcon} />
                    </div>
                    <div className={cls.profileUserNameWrapper}>
                        <h1 className={cls.profileUserName}>{name} {name ? '' : 'Shopigo User'}</h1>
                    </div>
                </div>
                <button className={cls.profileButton} onClick={() => openCenterModal('changeProfile')}>
                    <div className={cls.profileButtonIcon}>
                        <UserIcon width={"35px"}/>
                    </div>
                    <span>Change Profile</span>
                </button>
                <button className={cls.profileButton} onClick={() => openCenterModal('payment')}>
                    <div className={cls.profileButtonIcon}>
                        <CreditCardIcon width={"32px"}/>
                    </div>
                    <span>Payment methods</span>
                </button>
                <button className={cls.profileButton} onClick={() => openCenterModal('logOut')}>
                    <div className={cls.profileButtonIcon}>
                        <LogOutIcon width={"32px"}/>
                    </div>
                    <span>Log Out</span>
                </button>
                {
                    role === 'ADMIN' &&
                    <button className={cls.profileButton} onClick={() => navigate(ADMIN_ROUTE)}>
                        <div className={cls.profileButtonIcon}>
                            <AdminIcon width={"40px"}/>
                        </div>
                        <span>Admin Panel</span>
                    </button>
                }
            </aside>


            <section className={cls.mainSection}>
                <div className={cls.balanceWrapper}>
                    <h2 className={cls.balanceTitle}>Balance</h2>
                    <h3 className={cls.balanceAmount}>{balance} dram</h3>
                </div>

                <div className={cls.userActivity}>
                    <div className={cls.basket} onClick={() => navigate(BASKET_ROUTE)}>
                        <div className={cls.basketInfoWrapper}>
                            <h2 className={cls.basketTitle}>Basket</h2>
                            <p className={cls.basketDescription}>{basketProducts.length} products</p>
                        </div>
                        <div className={cls.basketIconWrapper}>
                            <BasketIcon className={cls.basketIcon} />
                        </div>
                    </div>
                    <div className={cls.favorites} onClick={() => navigate(FAVORITES_ROUTE)}>
                        <div className={cls.favoritesInfoWrapper}>
                            <h2 className={cls.favoritesTitle}>Favorites</h2>
                            <p className={cls.favoritesDescription}>{favoriteProducts.length} products</p>
                        </div>
                        <div className={cls.favoritesIconWrapper}>
                            <LikeIcon className={cls.favoritesIcon} />
                        </div>
                    </div>
                    <div className={cls.orders} onClick={() => navigate(ORDERS_ROUTE)}>
                        <div className={cls.ordersInfoWrapper}>
                            <h2 className={cls.ordersTitle}>Orders</h2>
                            <p className={cls.ordersDescription}>{orderProducts.length} orders</p>
                        </div>
                        <div className={cls.ordersIconWrapper}>
                            <OrdersIcon className={cls.ordersIcon} />
                        </div>
                    </div>
                </div>
                
                <div className={cls.support}>
                    <div className={cls.supportHeader}>
                        <h2>Support and feedback</h2>
                    </div>
                    <div className={cls.supportInfoWrapper}>
                        <div className={cls.supportInfoItem}>
                            <span onClick={() => openCenterModal('writeSupport')}>
                                <CommentIcon /> Write to support
                            </span>
                        </div>
                    </div>
                </div>
                
                {
                    recentlyViewed.length > 0 &&
                    <div className={cls.recentlyViewedWrapper}>
                        <h3>Recently viewed</h3>
                        <div className={cls.recentlyViewed}>
                            {
                                recentlyViewed.map((product) => (
                                    <ProductCard 
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            }
                        </div>
                    </div>
                }

            </section>


        </div>
    )
}

export default Profile