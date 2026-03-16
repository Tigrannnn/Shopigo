// Styles
import cls from './Shop.module.scss';

// Hooks
import { useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// SEO
import { Helmet } from 'react-helmet-async';

// Components
import ProductList from '@/components/containers/ProductList/ProductList';
import Loader from '@/components/ui/Loader/Loader';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';


function Shop() {
    const limit = useResponsiveProductLimit({ rows: 3 });

    // Get queries
    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetProductsQuery({ limit })
    const products = data ? data.pages.flatMap((p) => p.products ?? p) : []

    // Infinite scroll
    const infiniteScroll = useRef()

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Shopigo — Online marketplace';
    const description =
        'Discover products on Shopigo: browse the catalog, save favorites, and place orders in seconds.';

    useObserver(infiniteScroll, () => {
        fetchNextPage()
    }, isFetchingNextPage, hasNextPage)

    return(
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/`} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Shopigo" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/`} />
            </Helmet>
            <div className={cls.Shop}>
                {
                    isLoading ? <Loader variant='page'/> : <ProductList products={products} />
                }
            </div>
            <div 
                ref={infiniteScroll} 
                className="infiniteScroll" 
            >
                {isFetchingNextPage && <Loader />}
            </div>
        </>
    )
}

export default Shop