import { useNavigate, useParams } from 'react-router-dom'
import cls from '../styles/pages/Catalog.module.scss'
import { useCategoryState } from '../store/useCategoryState'
import { SHOP_ROUTE } from '../utils/consts';
import ProductCard from '../components/ProductCard.jsx'
import { useProductsState } from '../store/useProductsState'
import { useEffect, useState } from 'react'
import { getOneCategory } from '../http/categoryApi';
import { getProducts } from '../http/productApi';
import Loader from '../components/Loader';
import capitalizeFirstLetter from '../utils/useCapitalizeFirsLetter';

function Catalog() {
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const [category, setCategory] = useState({})
  
  useEffect(() => {
    document.title = capitalizeFirstLetter(category?.name) || 'Catalog'
  }, [category])

  const setProducts = useProductsState(state => state.setProducts)

  useEffect(() => {
    getOneCategory(id).then(data => {
      setCategory(data)
    })
    getProducts(id).then(data => {
      setProducts(data)
    })
    setLoading(false)
  }, [category])

  const openFilterModal = useCategoryState(state => state.openFilterModal)

  const products = useProductsState(state => state.products)

  const navigate = useNavigate()

  if (loading) return <Loader />

  return (
    <div className={cls.Catalog}>
      <div className={cls.catalogHeader}>
        <h1>{capitalizeFirstLetter(category.name)}</h1>
        <div className={cls.breadcrumbs}>
          <ul>
              <li onClick={() => navigate(SHOP_ROUTE)}>Main</li>
              <span aria-hidden="true">›</span>
              <li>{capitalizeFirstLetter(category.name)}</li>
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