import BasketProduct from '../components/BasketProduct'
import cls from '../styles/Basket.module.scss'
import { ReactComponent as CheckboxCheckIcon } from '../assets/icons/checkbox-check.svg'
import { useBasketState } from '../store/useBasketState'
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Link } from 'react-router-dom'
import { useOrderState } from '../store/useOrderState.js'
import { useNavigate } from 'react-router-dom'
import { ORDERS_ROUTE } from '../utils/consts'
import RecomendedBlock from '../components/RecommendedBlock.jsx';
import { useEffect, useState } from 'react'
import { useProfileState } from '../store/useProfileState'
import Loader from '../components/Loader'
import { getBasket } from '../http/basketApi'

function Basket() {
    useEffect(() => {
        document.title = 'Basket'
    }, [])
    const role = useProfileState(state => state.role)
    const basketProducts = useBasketState(state => state.basketProducts)
    // const selectedIds = useBasketState(state => state.selectedIds)
    // const selectAll = useBasketState(state => state.selectAll)
    // const deleteSelected = useBasketState(state => state.deleteSelected)
    // const clearSelected = useBasketState(state => state.clearSelected)
    // const addOrder = useOrderState(state => state.addOrder)

    const navigate = useNavigate()

    // const handleOrder = () => {
    //     if (selectedIds.length > 0 && role !== 'GUEST') {
    //         addOrder(basketProducts.filter(product => selectedIds.includes(product.id)))
    //         deleteSelected()
    //         navigate(ORDERS_ROUTE)
    //     } else if (role === 'guest') {
    //         navigate(LOGIN_ROUTE)
    //     }
    // }

    const handleChooseDeliveryAddress = () => {
        
    }

    return(
        <div className={cls.Basket}>
            {
                basketProducts.length === 0 ? (
                    <div className={cls.emptyBasket}>
                        <h1>Basket is empty</h1>
                        <h2>Take a look at the main page <br/> We have collected products there that you might like</h2>
                        <Link to={SHOP_ROUTE} className={cls.goToMainPage}>Go to main page</Link>
                    </div>
                ) : (
                    <>
                        <header className={cls.basketHeader}>
                            <h1>Basket <sup>{basketProducts.length}</sup></h1>
                        </header>
                        
                        <div className={cls.mainBlock}>
                            <section className={cls.leftSide}>
                                <div className={cls.selectAllBlock}>
                                    {/* <label htmlFor="selectAll" className="neon-checkbox">
                                        <input 
                                            type="checkbox" 
                                            id='selectAll' 
                                            onChange={() => selectedIds.length === basketProducts.length ? clearSelected() : selectAll()}
                                            checked={selectedIds.length === basketProducts.length}
                                            aria-label="Select all products"
                                        />
                                        <div className="neon-checkbox__frame">
                                            <div className="neon-checkbox__box"></div>
                                            <CheckboxCheckIcon className="neon-checkbox__check" />
                                            <div className="neon-checkbox__glow"></div>
                                        </div>
                                        <span className={cls.selectAllText}>Select All</span>
                                    </label> */}
                                </div>
                                
                                <div className={cls.productListBlock}>
                                    {basketProducts.map((product) => (
                                        <BasketProduct key={product.id} product={product}/>
                                    ))}
                                </div>
                            </section>
                            
                            <aside className={cls.rightSide}>
                                <div className={cls.orderBlock}>
                                    <div className={cls.chooseAddressWrapper}>
                                        <h2
                                            onClick={() => 
                                                role ? navigate(LOGIN_ROUTE) : handleChooseDeliveryAddress()
                                            }
                                        >
                                            Choose delivery address
                                        </h2>
                                    </div>
                                    
                                    <div className={cls.priceInfoBlockWrapper}>
                                        <div className={cls.priceInfoWrapper}>
                                            {/* <span>Products ({selectedIds.length})</span> */}
                                            {/* <span>
                                                {
                                                    basketProducts
                                                        .filter(product => selectedIds.includes(product.id))
                                                        .reduce((sum, product) => sum + product.price * product.quantity, 0)
                                                } dram
                                            </span> */}
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
                                            {/* <span>Total</span>
                                            <span>
                                                {
                                                    basketProducts
                                                        .filter(product => selectedIds.includes(product.id))
                                                        .reduce((sum, product) => sum + product.price * product.quantity, 0)
                                                } dram
                                            </span> */}
                                        </div>
                                    </div>
                                    
                                    <div className={cls.orderButtonWrapper}>
                                        <button 
                                            className={cls.orderButton}
                                            aria-label="Place order"
                                            // onClick={handleOrder}
                                        >
                                            Order
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                )
            }

            <RecomendedBlock />
        </div>
    )
}

export default Basket