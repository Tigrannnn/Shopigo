import ProductCard from '../components/ProductCard.jsx'
import cls from '../styles/Shop.module.scss'
import { useProductsState } from '../store/useProductsState.js'
import { useEffect } from 'react'
import { getProducts } from '../http/productApi.js'

function Shop() {
    const products = useProductsState(state => state.products)
    const setProducts = useProductsState(state => state.setProducts)

    useEffect(() => {
        document.title = 'Shopigo'
        getProducts().then(data => {
            setProducts(data)
        })
    }, [])

    return(
        <div className={cls.Shop}>
            {products?.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop