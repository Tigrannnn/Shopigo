import Shop from "../pages/Shop"
import { useProductsState } from "../store/useProductsState"
import { useRecentlyWatchedState } from "../store/useRecentlyWatchedState"
import cls from '../styles/components/RecomendedBlock.module.scss'
import ProductCard from "./ProductCard"

function RecomendedBlock() {
    const products = useProductsState(state => state.products)
    const recentlyWatched = useRecentlyWatchedState(state => state.recentlyWatched)

    return (
        <div className={cls.RecommendedBlock}>
            {
                recentlyWatched.length > 0 && (
                    <div className={cls.recentlyWatched}>
                        <h2>Recently Watched</h2>
                        <div className={cls.productList}>
                            {recentlyWatched.map(product => (
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