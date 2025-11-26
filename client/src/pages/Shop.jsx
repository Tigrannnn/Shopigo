import ProductCard from '../components/ProductCard.jsx'
import cls from '../styles/Shop.module.scss'
import { useProductsState } from '../store/useProductsState.js'
import { useEffect } from 'react'

function Shop() {
    useEffect(() => {
        document.title = 'Shopigo'
    }, [])
    const products = useProductsState(state => state.products)

    return(
        <div className={cls.Shop}>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop