// Styles
import cls from './ProductList.module.scss'

// Components
import ProductCard from '@/components/elements/ProductCard/ProductCard'


function ProductList({ products }) {
  return (
    <div className={cls.ProductList}>
      {products && products.map(product => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default ProductList