// Styles
import cls from './Search.module.scss';

// Hooks
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';
import { useObserver } from '@/hooks/useObserver';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// SEO
import { Helmet } from 'react-helmet-async';

// Utils
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

// Components
import Loader from '@/components/ui/Loader/Loader';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import ProductList from '@/components/containers/ProductList/ProductList';


function Search() {
    // Search
    const [searchParams] = useSearchParams()
    const search = capitalizeFirstLetter(searchParams.get('search'))
    const infiniteScrollRef = useRef()
    const limit = useResponsiveProductLimit({ rows: 3 });

    // Get queries
    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useGetProductsQuery({ search, limit })

    const searchProducts = data ? data.pages.flatMap((p) => p.products ?? p) : []

    useObserver(infiniteScrollRef, () => fetchNextPage(), isFetchingNextPage, hasNextPage)

    const allPagesLoaded = !hasNextPage && !isFetchingNextPage

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = `${search ?? 'Search'} — Shopigo`;
    const description = search
    ? `Search results for “${search}” on Shopigo. Browse matching products and add to your basket.`
    : 'Search products on Shopigo and discover something new.';
    
    if (isLoading && searchProducts.length === 0) return <Loader />

    return (
        <div className={cls.Search}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/shop/search?search=${encodeURIComponent(search ?? '')}`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/shop/search?search=${encodeURIComponent(search ?? '')}`} />
            </Helmet>
            {
                searchProducts.length === 0 && !isLoading && (
                    <h2 className={cls.notFoundText}>Nothing was found for the search «{search}»</h2>
                )
            }
            {
                searchProducts.length > 0 && (
                    <>
                        <div className={cls.header}>
                            <h2 className={cls.title}>{search}</h2>
                        </div>
                        <div className={cls.searchContent}>
                            <ProductList products={searchProducts} />
                        </div>
                        <div ref={infiniteScrollRef} className="infiniteScroll">
                            {isFetchingNextPage && <Loader />}
                        </div>
                    </>
                )
            }            
            {allPagesLoaded && <RecommendedBlock />}
        </div>
    )
}

export default Search