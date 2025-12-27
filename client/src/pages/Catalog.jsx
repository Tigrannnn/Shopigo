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
import RecommendedBlock from '../components/RecommendedBlock';
import Filter from '../components/Filter';

function Catalog() {
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const [category, setCategory] = useState({})
  
  useEffect(() => {
    document.title = capitalizeFirstLetter(category?.name) || 'Catalog'
  }, [category])

  const setCategoryProducts = useCategoryState(state => state.setCategoryProducts)

  useEffect(() => {
    getOneCategory(id).then(data => {
      setCategory(data)
    }).then(() => getProducts({categoryId: id}).then(data => {
        setCategoryProducts(data)
      }).finally(() => setLoading(false)))
  }, [id, setCategoryProducts])

  const categoryProducts = useCategoryState(state => state.categoryProducts)

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
          categoryProducts.length <= 0 ? (
            <div className={cls.emptyCatalog}>
              <h1>{capitalizeFirstLetter(category.name)}</h1>
              <div>
                <h2>No products in this category yet <br/> We will add them soon</h2>
                <h3>Take a look at the main page <br/> We have collected products there that you might like</h3>
              </div>
              <button onClick={() => navigate(SHOP_ROUTE)}>Go to main page</button>
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
              <Filter />
            </div>
            <div className={cls.catalogContent}>
              {
                categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </div>
          </>
          )
        )
      }
      <RecommendedBlock />
    </div>
  )
}

export default Catalog