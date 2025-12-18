import cls from '../styles/pages/Search.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useProductsState } from '../store/useProductsState'
import { useEffect, useState } from 'react'
import { getProducts } from '../http/productApi'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import capitalizeFirstLetter from '../utils/useCapitalizeFirsLetter'
import RecomendedBlock from '../components/RecommendedBlock'
import { PRODUCT_ROUTE } from '../utils/consts'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = capitalizeFirstLetter(searchParams.get('search'))
    const [loading, setLoading] = useState(true)

    const products = useProductsState(state => state.products)
    const setProducts = useProductsState(state => state.setProducts)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getProducts({search}).then(data => {
            data.length === 1 ? 
            navigate(`${PRODUCT_ROUTE}/${data[0].id}`, {replace: true}) :
            setProducts(data)
        }).finally(() => 
            setLoading(false)
        )
    }, [search])

    if (loading) return <Loader />

    return (
        <div>
            {
                products.length === 0 && (
                    <>
                        <h1>Nothing was found for the search «{search}»</h1>
                        {/* <RecomendedBlock /> */}
                    </>
                )
            }
            {
                products.length > 0 && (
                    <>
                        <h1>{search}</h1>
                        <div className={cls.searchContent}>
                            {
                                products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Search