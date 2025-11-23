import cls from '../styles/Orders.module.scss';
import { useOrderState } from '../store/useOrderState';
import { Link } from 'react-router-dom';
import { BASKET_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import OrderCard from '../components/OrderCard';
import { useProfileState } from '../store/useProfileState';
import RecomendedBlock from '../components/RecommendedBlock';
import { useState } from 'react';

function Orders() {
    const orderProducts = useOrderState(state => state.orderProducts)
    const user = useProfileState(state => state.user)
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredOrders = statusFilter === 'all' 
        ? orderProducts 
        : orderProducts.filter(order => order.status === statusFilter)

    const statusOptions = [
        { value: 'all', label: 'All Orders', count: orderProducts.length },
        { value: 'pending', label: 'Pending', count: orderProducts.filter(o => o.status === 'pending').length },
        { value: 'processing', label: 'Processing', count: orderProducts.filter(o => o.status === 'processing').length },
        { value: 'shipped', label: 'Shipped', count: orderProducts.filter(o => o.status === 'shipped').length },
        { value: 'delivered', label: 'Delivered', count: orderProducts.filter(o => o.status === 'delivered').length },
        { value: 'cancelled', label: 'Cancelled', count: orderProducts.filter(o => o.status === 'cancelled').length }
    ]

    return (
        <div className={cls.Orders}>
            {
                (user === 'guest') ? (
                    <div className={cls.notLoggedIn}>
                        <h1>You are not logged in</h1>
                        <h2>To access your personal account, you need to log in</h2>
                        <Link to={LOGIN_ROUTE} className={cls.routeButton}>Log In</Link>
                    </div>
                ) : orderProducts.length === 0 ?  (
                    <div className={cls.emptyOrders}>
                        <h1>Orders is empty</h1>
                        <h2>Here will be the products you order <br />We will tell you when you can receive them</h2>
                        <Link to={BASKET_ROUTE} className={cls.routeButton}>Go to basket</Link>
                    </div>
                ) : orderProducts.length > 0 ? (
                    <>
                        <header className={cls.ordersHeader}>
                            <h1>Orders <sup>{orderProducts.length}</sup></h1>
                        </header>

                        <div className={cls.filterSection}>
                            <div className={cls.filterButtons}>
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`${cls.filterButton} ${statusFilter === option.value ? cls.activeFilter : ''}`}
                                        onClick={() => setStatusFilter(option.value)}
                                    >
                                        {option.label}
                                        <span className={cls.filterCount}>{option.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={cls.ordersList}>
                            {filteredOrders.map((order) => (
                                <OrderCard key={order.orderId} product={order} />
                            ))}
                        </div>

                        {filteredOrders.length === 0 && statusFilter !== 'all' && (
                            <div className={cls.noOrdersForFilter}>
                                <h2>No orders with status "{statusOptions.find(o => o.value === statusFilter)?.label}"</h2>
                                <button 
                                    className={cls.clearFilterButton}
                                    onClick={() => setStatusFilter('all')}
                                >
                                    Show all orders
                                </button>
                            </div>
                        )}
                    </>
                ) : null
            }

            <RecomendedBlock />
        </div>
    );
}

export default Orders; 