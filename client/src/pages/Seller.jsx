import cls from "../styles/pages/Seller.module.scss"
import { useParams } from "react-router-dom";
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import ProductCard from "../components/ProductCard";
import { useCategoryState } from "../store/useCategoryState";
import RecommendedBlock from "../components/RecommendedBlock";
import { useEffect, useState } from 'react'
import { getProducts } from "../http/productApi";
import Loader from "../components/Loader";
import { getOneSeller } from "../http/sellerApi";
import { useSellerState } from "../store/useSellerState";
import Filter from "../components/Filter";

function Seller() {
    const [loading, setLoading] = useState(true)

    const sellerProducts = useSellerState(state => state.sellerProducts)
    const setSellerProducts = useSellerState(state => state.setSellerProducts)

    const { id } = useParams()

    const [seller, setSeller] = useState({})

    useEffect(() => {
        document.title = seller?.name || 'Seller'
    }, [seller])

    useEffect(() => {
        getOneSeller(id).then(data => {
            setSeller(data)
        }).finally(() => {
            getProducts({sellerId: id}).then(data => {
                setSellerProducts(data)
            }).finally(() => setLoading(false))
        })
    }, [seller, setSellerProducts])

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
                 <Filter />
                <div className={cls.productList}>
                    {
                        sellerProducts.map(product => 
                            <ProductCard key={product.id} product={product} />
                        )
                    }
                </div>
            </div>

            <RecommendedBlock />
        </div>
    )
}

export default Seller