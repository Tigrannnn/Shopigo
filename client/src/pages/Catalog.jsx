import { Link, useNavigate, useParams } from 'react-router-dom'
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
import NotFound from './NotFound';

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
    }).then(() => getProducts({categoryId: id}).then(data => {
        setProducts(data)
      }).finally(() => setLoading(false)))
  }, [id, setProducts])

  const openFilterModal = useCategoryState(state => state.openFilterModal)

  const products = useProductsState(state => state.products)

  const navigate = useNavigate()

  if (loading) return <Loader />

  return (
    <div className={cls.Catalog}>
      {
        !category.id && (
          <>
            <NotFound />
          </>
        )
      }
      {
        category.id && (
          products.length <= 0 ? (
            <div className={cls.emptyCatalog}>
              <h1>{capitalizeFirstLetter(category.name)}</h1>
              <h2>No products in this category yet <br/> We will add them soon</h2>
              <h3>Take a look at the main page <br/> We have collected products there that you might like</h3>
              <Link to={SHOP_ROUTE}>Go to main page</Link>
            </div>
          ) : (
          <>
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
          </>
          )
        )
      }
    </div>
  )
}

export default Catalog