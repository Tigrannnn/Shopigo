// Styles
import cls from './RecentlyViewed.module.scss';

// Hooks
import { useGetRecentlyViewedQuery } from '@/hooks/query/useRecentlyViewedQuery';

// Components
import ProductCard from '@/components/elements/ProductCard/ProductCard';
import Loader from '@/components/ui/Loader/Loader';


function RecentlyViewed() {
    const { data: recentlyViewedProducts, isLoading } = useGetRecentlyViewedQuery()

    if (!isLoading && (!recentlyViewedProducts || recentlyViewedProducts.length === 0)) return null

    return(
        <div className={cls.RecentlyViewed}>
            <h2>Recently Viewed</h2>
            {isLoading ? (
                <Loader />
            ) : !isLoading && recentlyViewedProducts.length > 0 && (
                <div className={cls.productList}>
                    {recentlyViewedProducts.map(({id, product}) => (
                        <ProductCard key={id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentlyViewed