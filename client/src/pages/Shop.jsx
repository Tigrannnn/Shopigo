import ProductCard from '../components/ProductCard.jsx'
import cls from '../styles/Shop.module.scss'
import { useProductsState } from '../store/ProductsState'

function Shop() {
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