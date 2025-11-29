import cls from "../styles/Seller.module.scss"
import { useParams } from "react-router-dom";
import { useProductsState } from "../store/useProductsState";
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import ProductCard from "../components/ProductCard";
import { useCategoryState } from "../store/useCategoryState";
import RecomendedBlock from "../components/RecommendedBlock";
import { useEffect, useState } from 'react'
import { getProducts } from "../http/productApi";
import Loader from "../components/Loader";
import { getOneSeller } from "../http/sellerApi";

function Seller() {
    const [loading, setLoading] = useState(true)

    const products = useProductsState(state => state.products)
    const setProducts = useProductsState(state => state.setProducts)

    const { id } = useParams()

    const [seller, setSeller] = useState({})

    useEffect(() => {
        document.title = seller?.name || 'Seller'
    }, [seller])

    useEffect(() => {
        getOneSeller(id).then(data => {
            setSeller(data)
        })
        getProducts(null, id).then(data => {
            setProducts(data)
        })
        setLoading(false)
    }, [seller])

    const openFilterModal = useCategoryState(state => state.openFilterModal)

    if (loading) return <Loader />

    return (
        <div className={cls.Seller}>
            <div className={cls.sellerDetails}>
                <div className={cls.sellerDetailsMain}>
                    <h2>{seller.name}</h2>
                    <span className={cls.sellerRating}><StarIcon fill="currentColor"/> {seller.rating} ∙ <p>83,964 product ratings</p></span>
                </div>
                <div className={cls.sellerDetailsParametersWrapper}>
                    {
                        seller.level &&
                        <div className={cls.sellerDetailsParameter}>
                            <span>Seller Level</span>
                            <span 
                                style={{
                                    color: seller.level === "Gold" ? '#f39c12' :
                                    seller.level === "Silver" ? '#8d8d8dff' :
                                    seller.level === "Bronze" ? '#7c2e00' :
                                    'black'
                                }}
                            >
                                {seller.level}
                            </span>
                        </div>
                    }
                    <div className={cls.sellerDetailsParameter}>
                        <span>Products sold</span>
                        <span >18432</span>
                    </div>
                    {
                        seller.yearsOnShopigo &&
                        <div className={cls.sellerDetailsParameter}>
                            <span>On Shopigo</span>
                            <span>{seller.yearsOnShopigo}</span>
                        </div>
                    }
                </div>
                
            </div>
            <div className={cls.productListBlock}>
                <h2>All products</h2>
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
                <div className={cls.productList}>
                    {
                        products.map(product => 
                            <ProductCard key={product.id} product={product} />
                        )
                    }
                </div>
            </div>

            <RecomendedBlock />
        </div>
    )
}

export default Seller