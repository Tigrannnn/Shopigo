import { useNavigate, useParams } from 'react-router-dom'
import cls from '../styles/Catalog.module.scss'
import { useCatalogState } from '../store/useCatalogState'
import { SHOP_ROUTE } from '../utils/consts';
import ProductCard from '../components/ProductCard.jsx'
import { useProductsState } from '../store/ProductsState'
import { useEffect } from 'react'

function Catalog() {
  const { id } = useParams()

  const catalog = useCatalogState(state => state.catalog)
  const category = catalog.find(item => item.id === +id)

  const openFilterModal = useCatalogState(state => state.openFilterModal)

  const products = useProductsState(state => state.products)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = category?.name || 'Catalog'
  }, [category])

  return (
    <div className={cls.Catalog}>
      <div className={cls.catalogHeader}>
        <h1>{category.name}</h1>
        <div className={cls.breadcrumbs}>
          <ul>
              <li onClick={() => navigate(SHOP_ROUTE)}>Main</li>
              <span aria-hidden="true">›</span>
              <li>{category.name}</li>
          </ul>
        </div>
        <div className={cls.filter}>
          <div className={cls.filterItem} onClick={() => openFilterModal()}>
            <span>All filters</span>
          </div>
          <div className={cls.filterItem} onClick={() => console.log('hello')}>
            <span>Subcategory</span>
            <span>↓</span>
          </div>
          <div className={cls.filterItem} onClick={() => console.log('hello')}>
            <span>Price (dram)</span>
            <span>↓</span>
          </div>
          <div className={cls.filterItem} onClick={() => console.log('hello')}>
            <span>Delivery time</span>
            <span>↓</span>
          </div>
        </div>
      </div>
      <div className={cls.catalogContent}>
        {
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Catalog