// Router
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Seller.module.scss';

// Hooks
import { useGetSellerByIdQuery } from '@/hooks/query/useSellersQuery';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';
import { useObserver } from '@/hooks/useObserver';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// Components
import Loader from '@/components/ui/Loader/Loader';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import ProductList from '@/components/containers/ProductList/ProductList';

function Seller() {
    const { id } = useParams()
    const infiniteScrollRef = useRef()
    const limit = useResponsiveProductLimit({ rows: 3 });

    const { data: seller, isLoading: isSellerLoading } = useGetSellerByIdQuery(id)
    const {
        data: productsData,
        isLoading: isProductsLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useGetProductsQuery({ sellerId: id, limit })

    const products = productsData ? productsData.pages.flatMap((p) => p.products ?? p) : []

    useObserver(infiniteScrollRef, () => fetchNextPage(), isFetchingNextPage, hasNextPage)

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = seller?.name ? `${seller.name} — Seller | Shopigo` : 'Seller — Shopigo';
    const description = seller?.name
        ? `Explore products sold by ${seller.name} on Shopigo.`
        : 'Explore seller products on Shopigo.';
    const canonicalUrl = `${baseUrl}/seller/${id}`;

    const allPagesLoaded = !hasNextPage && !isFetchingNextPage

    if (isSellerLoading) return <Loader />

    return (
        <div className={cls.Seller}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
            </Helmet>
            <div className={cls.sellerDetails}>
                <div className={cls.sellerDetailsMain}>
                    <h2>{seller?.name}</h2>
                </div>
            </div>
            <div className={cls.productListBlock}>
                {isProductsLoading && products.length === 0 ? (
                    <Loader />
                ) : (
                    <>
                        <ProductList products={products} />
                        <div ref={infiniteScrollRef} className="infiniteScroll">
                            {isFetchingNextPage && <Loader />}
                        </div>
                    </>
                )}
            </div>

            {products.length > 0 && allPagesLoaded && <RecommendedBlock />}
        </div>
    )
}

export default Seller