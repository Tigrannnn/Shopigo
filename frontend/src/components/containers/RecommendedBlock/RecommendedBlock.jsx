// Styles
import cls from './RecommendedBlock.module.scss';

// Hooks
import { useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// Components
import Loader from '@/components/ui/Loader/Loader';
import ProductList from '../ProductList/ProductList';


function RecommendedBlock() {
    const limit = useResponsiveProductLimit({ rows: 3 });
    const {
        data,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useGetProductsQuery({ limit, queryKey: 'recommended' });
    const recommendedProducts = data ? data.pages.flatMap((p) => p.products ?? p) : [];
    const infiniteScroll = useRef();

    useObserver(infiniteScroll, () => {
        fetchNextPage();
    }, isLoading, hasNextPage);

    return (
        <>
            <div className={cls.RecommendedBlock}>
                <div className={cls.productListWrapper}>
                    <h2>Recommended</h2>
                    <ProductList products={recommendedProducts} />
                </div>
            </div>
            <div ref={infiniteScroll} className="infiniteScroll">
                {(isLoading || isFetchingNextPage) && <Loader />}
            </div>
        </>
    );
}

export default RecommendedBlock