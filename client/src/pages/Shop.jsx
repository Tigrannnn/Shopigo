import ProductCard from '../components/ProductCard.jsx'
import cls from '../styles/Shop.module.scss'
import { useProductsState } from '../store/useProductsState.js'
import { useEffect, useState } from 'react'
import { getProducts } from '../http/productApi.js'
import Loader from '../components/Loader.jsx'

function Shop() {
    const products = useProductsState(state => state.products)
    const setProducts = useProductsState(state => state.setProducts)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'Shopigo'
        // setTimeout(() => {
            getProducts().then(data => {
                setProducts(data)
            }).finally(() => setLoading(false))
        // }, 2000);
    }, [])

    if (loading) return <Loader />

    return(
        <div className={cls.Shop}>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop