// React and Router
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Orders.module.scss';

// Utils
import { BASKET_ROUTE, LOGIN_ROUTE } from '@/utils/constants/routes';

// Components
import OrderCard from '@/components/elements/OrderCard/OrderCard';
import RecentlyViewed from '@/components/containers/RecentlyViewed/RecentlyViewed';

import RecomendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import { useGetOrdersQuery } from '@/hooks/query/useOrdersQuery';
import Loader from '@/components/ui/Loader/Loader';
import { useAuthQuery } from '@/hooks/query/useUsersQuery';

function Orders() {
    useEffect(() => {
        document.title = 'Orders'
    }, [])

    const { data: orderProducts, isLoading } = useGetOrdersQuery()

    const { data: user } = useAuthQuery()


    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Orders — Shopigo';
    const description = 'Track and manage your orders on Shopigo.';

    return (
        <div className={cls.Orders}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/orders`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/orders`} />
            </Helmet>
            {
                isLoading ? (
                    <Loader />
                ) : !user ? (
                    <div className={cls.emptyOrders}>
                        <h1>You are not logged in</h1>
                        <h2>Please to see your orders</h2>
                        <Link to={LOGIN_ROUTE} className={cls.routeButton}>Go to login</Link>
                    </div>
                ) : !isLoading && orderProducts && orderProducts.length === 0 ? (
                    <div className={cls.emptyOrders}>
                        <h1>Orders is empty</h1>
                        <h2>Here will be the products you order <br />We will tell you when you can receive them</h2>
                        <Link to={BASKET_ROUTE} className={cls.routeButton}>Go to basket</Link>
                    </div>
                ) : (
                    <>
                        <header className={cls.ordersHeader}>
                            <h1>Orders <sup>{orderProducts.length}</sup></h1>
                        </header>
                        
                        <div className={cls.ordersList}>
                            {orderProducts.map((orderProduct) => (
                                <OrderCard key={orderProduct.id} orderProduct={orderProduct} />
                            ))}
                        </div>
                    </>
                )
            }

            <RecentlyViewed />
            <RecomendedBlock />
        </div>
    );
}

export default Orders; 