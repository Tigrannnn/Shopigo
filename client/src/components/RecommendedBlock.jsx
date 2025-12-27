import Shop from "../pages/Shop"
import { useProductsState } from "../store/useProductsState"
import { useRecentlyViewedState } from "../store/useRecentlyViewedState"
import cls from '../styles/components/RecomendedBlock.module.scss'
import ProductCard from "./ProductCard"

function RecomendedBlock() {
    const products = useProductsState(state => state.products)
    const recentlyViewed = useRecentlyViewedState(state => state.recentlyViewed)

    return (
        <div className={cls.RecommendedBlock}>
            {
                recentlyViewed.length > 0 && (
                    <div className={cls.recentlyViewed}>
                        <h2>Recently Viewed</h2>
                        <div className={cls.productList}>
                            {recentlyViewed.map(product => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                    </div>
                )
            }
            <div className={cls.productListWrapper}>
                <h2>Recomended</h2>
                {/* <div className={cls.productList}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div> */}
                <Shop />
            </div>
        </div>
    )
}

export default RecomendedBlock