// React and Router
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Basket.module.scss';

// Icons & Images
import { ReactComponent as CheckboxCheckIcon } from '@/assets/icons/checkbox-check.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useAuthQuery } from '@/hooks/query/useUsersQuery';
import { useCreateOrderQuery } from '@/hooks/query/useOrdersQuery';
import { useGetBasketQuery, useToggleSelectAllQuery } from '@/hooks/query/useBasketQuery';

// Utils
import { LOGIN_ROUTE, SHOP_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';


// Components
import BasketProduct from '@/components/elements/BasketProduct/BasketProduct';
import RecentlyViewed from '@/components/containers/RecentlyViewed/RecentlyViewed';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import Loader from '@/components/ui/Loader/Loader';
import Button from '@/components/ui/Button/Button';


function Basket() {
    // Router
    const navigate = useNavigate()

    // Modal
    const openModal = useModalState(state => state.openModal)

    // Get queries
    const { data: user } = useAuthQuery()
    const { data: basketProducts, isLoading } = useGetBasketQuery()

    // Mutation queries
    const { mutate: toggleSelectAll } = useToggleSelectAllQuery()
    const { mutate: createOrder, isPending: isOrderPending } = useCreateOrderQuery()


    // Create order handler
    const handleCreateOrder = () => {
        if (user) {
            createOrder()
        } else {
            navigate(LOGIN_ROUTE)
        }
    }

    const selectedProducts = useMemo(
        () => basketProducts?.filter(product => product.selected) ?? [],
        [basketProducts]
    )

    const totalPrice = useMemo(
        () => selectedProducts.reduce(
            (sum, product) => sum + product.product.price * product.quantity,
            0
        ),
        [selectedProducts]
    )

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Basket — Shopigo';
    const description = 'Review items in your basket and place an order on Shopigo.';

    return(
        <div className={cls.Basket}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/basket`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/basket`} />
            </Helmet>
            {
                isLoading ? (
                    <Loader />
                ) : basketProducts && basketProducts.length === 0 ? (
                    <div className={cls.emptyBasket}>
                        <h1>Basket is empty</h1>
                        <h2>Take a look at the main page <br/> We have collected products there that you might like</h2>
                        <Button onClick={() => navigate(SHOP_ROUTE)}>Go to main page</Button>
                    </div>
                ) : (
                    <>
                        <header className={cls.basketHeader}>
                            <h1>Basket <sup>{basketProducts.length}</sup></h1>
                        </header>
                        
                        <div className={cls.mainBlock}>
                            <section className={cls.leftSide}>
                                <div className={cls.selectAllBlock}>
                                    <label htmlFor="selectAll" className="neon-checkbox">
                                        <input 
                                            type="checkbox" 
                                            id='selectAll' 
                                            aria-label="Select all products"
                                            onChange={() => toggleSelectAll()}
                                            checked={basketProducts.every(product => product.selected)}
                                        />
                                        <div className="neon-checkbox__frame">
                                            <div className="neon-checkbox__box"></div>
                                            <CheckboxCheckIcon className="neon-checkbox__check" />
                                            <div className="neon-checkbox__glow"></div>
                                        </div>
                                        <span className={cls.selectAllText}>Select All</span>
                                    </label>
                                </div>
                                
                                <div className={cls.productListBlock}>
                                    {basketProducts.map((basketProduct) => (
                                        <BasketProduct key={basketProduct.id} basketProduct={basketProduct}/>
                                    ))}
                                </div>
                            </section>
                            
                            <aside className={cls.rightSide}>
                                <div className={cls.orderBlock}>
                                    <div className={cls.chooseAddressWrapper}>
                                        <h2
                                            onClick={() => 
                                                user ? navigate(LOGIN_ROUTE) : openModal('chooseAdress')
                                            }
                                        >
                                            Choose delivery address
                                        </h2>
                                    </div>
                                    
                                    <div className={cls.priceInfoBlockWrapper}>
                                        <div className={cls.priceInfoWrapper}>
                                            <span>
                                                Products ({selectedProducts.length})
                                            </span>
                                            <span>
                                                {formatPrice(totalPrice)}
                                            </span>
                                        </div>
                                        <div className={cls.priceInfoWrapper}>
                                            <span>Delivery</span>
                                            <span>Free</span>
                                        </div>
                                        <div className={cls.priceInfoWrapper}>
                                            <span>Packaging</span>
                                            <span>Included</span>
                                        </div>
                                        <div className={`${cls.priceInfoWrapper} ${cls.totalPrice}`}>
                                            <span>Total</span>
                                            <span>
                                                {formatPrice(
                                                    basketProducts
                                                        .filter(product => product.selected === true)
                                                        .reduce((sum, basketProduct) => sum + basketProduct.product.price * basketProduct.quantity, 0)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className={cls.orderButtonWrapper}>
                                        <Button 
                                            className={cls.orderButton}
                                            aria-label="Place order"
                                            onClick={handleCreateOrder}
                                            disabled={isOrderPending}
                                        >
                                            {isOrderPending ? 'Ordering...' : 'Order'}
                                        </Button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                )
            }

            <RecentlyViewed />
            <RecommendedBlock />
        </div>
    )
}

export default Basket