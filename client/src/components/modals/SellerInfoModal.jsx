import { useSellerInfoState } from '../../store/useSellerInfoState';
import cls from '../../styles/components/modals/SellerInfoModal.module.scss';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { SELLER_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

function SellerInfoModal({product}) {
    const isSellerInfoModalOpen = useSellerInfoState(state => state.isSellerInfoModalOpen)
    const navigate = useNavigate()

    return(
        <div className={`${cls.SellerInfoModal} ${isSellerInfoModalOpen ? cls.open : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className={cls.sellerHeader}>
                <h2 className={cls.sellerName}>{product.seller.name}</h2>
                <div className={cls.ratingInfo}>
                    <StarIcon className={cls.starIcon} />
                    <span className={cls.rating}>{product.seller.rating}</span>
                    <span className={cls.reviewsCount}>{product.seller.reviews} product reviews</span>
                </div>
            </div>
            
            <div className={cls.sellerStats}>
                <div className={cls.statItem}>
                    <span className={cls.statLabel}>Seller level</span>
                    <div className={cls.statValue}>
                        <span 
                            style={{
                                color: product.seller.level === "Gold" ? '#f39c12' : 
                                product.seller.level === "Silver" ? '#8d8d8dff' : 
                                product.seller.level === "Bronze" ? '#7c2e00' : 
                                "black"
                            }}
                        >{product.seller.level}</span>
                    </div>
                </div>
                
                <div className={cls.statItem}>
                    <span className={cls.statLabel}>Products sold</span>
                    <span className={cls.statValue}>{product.seller.productsSold}</span>
                </div>
                
                <div className={cls.statItem}>
                    <span className={cls.statLabel}>On Shopigo</span>
                    {/* <span className={cls.statValue}>{product.seller.yearsOnShopigo}</span> */}
                </div>
            </div>
            
            <button 
                className={cls.allProductsButton} 
                onClick={() => navigate(SELLER_ROUTE + `/${product.seller.id}`)}
                aria-label="All seller's products"
            >
                All seller's products
            </button>
        </div>
    )
}

export default SellerInfoModal;