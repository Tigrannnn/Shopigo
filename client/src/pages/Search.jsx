import cls from '../styles/pages/Search.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchState } from '../store/useSearchState'
import { useEffect, useState } from 'react'
import { getProducts } from '../http/productApi'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import capitalizeFirstLetter from '../utils/useCapitalizeFirsLetter'
import RecommendedBlock from '../components/RecommendedBlock'
import { PRODUCT_ROUTE } from '../utils/consts'
import Filter from '../components/Filter'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = capitalizeFirstLetter(searchParams.get('search'))
    const [loading, setLoading] = useState(true)

    const searchProducts = useSearchState(state => state.searchProducts)
    const setSearchProducts = useSearchState(state => state.setSearchProducts)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getProducts({search}).then(data => {
            data.length === 1 ? 
            navigate(`${PRODUCT_ROUTE}/${data[0].id}`, {replace: true}) :
            setSearchProducts(data)
        }).finally(() => 
            setLoading(false)
        )
    }, [search])

    if (loading) return <Loader />

    return (
        <div className={cls.Search}>
            {
                searchProducts.length === 0 && (
                    <>
                        <h1>Nothing was found for the search «{search}»</h1>
                    </>
                )
            }
            {
                searchProducts.length > 0 && (
                    <>
                        <div className={cls.header}>
                            <h1 className={cls.title}>{search}</h1>
                            <Filter />
                        </div>
                        <div className={cls.searchContent}>
                            {
                                searchProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    </>
                )
            }
            <RecommendedBlock />
        </div>
    )
}

export default Search