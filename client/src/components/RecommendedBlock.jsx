import Shop from "../pages/Shop"
import { useProductsState } from "../store/useProductsState"
import { useRecentlyViewedState } from "../store/useRecentlyViewedState"
import cls from '../styles/components/RecommendedBlock.module.scss'
import ProductCard from "./ProductCard"
import { getRecentlyViewed } from "../http/recentlyViewedApi"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import { getProducts } from "../http/productApi"

function RecommendedBlock() {
    const products = useProductsState(state => state.products)
    const setProducts = useProductsState(state => state.setProducts)
    const recentlyViewedProducts = useRecentlyViewedState(state => state.recentlyViewedProducts)
    const setRecentlyViewedProducts = useRecentlyViewedState(state => state.setRecentlyViewedProducts)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getRecentlyViewed().then(data => {
            setRecentlyViewedProducts(data)
        }).finally(() => 
            getProducts().then((data) => 
                setProducts(data)
            ).finally(() => setLoading(false))
        )
    }, [setRecentlyViewedProducts])

    if (loading) return <Loader />

    return (
        <div className={cls.RecommendedBlock}>
            {
                recentlyViewedProducts.length > 0 && (
                    <div className={cls.recentlyViewed}>
                        <h2>Recently Viewed</h2>
                        <div className={cls.productList}>
                            {recentlyViewedProducts.map(product => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                        </div>
                    </div>
                )
            }
            <div className={cls.productListWrapper}>
                <h2>Recomended</h2>
                <div className={cls.productList}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecommendedBlock