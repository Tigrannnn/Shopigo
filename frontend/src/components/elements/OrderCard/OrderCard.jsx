// React and Router
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './OrderCard.module.scss';

// Icons & Images
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';

// Hooks
import { 
    useAddToFavoritesQuery, 
    useGetFavoritesQuery, 
    useRemoveFromFavoritesQuery 
} from '@/hooks/query/useFavoritesQuery';
import useHandleShare from '@/hooks/useHandleShare';

// Utils
import { PRODUCT_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';


function OrderCard({ orderProduct }) {
    // Router
    const navigate = useNavigate()

    // Order product destructuring
    const { product, price, quantity, createdAt } = orderProduct

    // Get Queries
    const { data: favoriteProducts } = useGetFavoritesQuery()
    
    // Mutation queries
    const { mutate: addToFavorites } = useAddToFavoritesQuery()
    const { mutate: removeFromFavorites } = useRemoveFromFavoritesQuery()

    // Check if product is in favorites
    const isFavorite = favoriteProducts?.some(favoriteProduct => favoriteProduct.product.id === product.id)

    // Handle share hook
    const handleShare = useHandleShare()


    return (
        <article className={cls.OrderCard}>
            <div className={cls.imgWrapper} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
                <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className={cls.productImage} 
                />
            </div>

            <div className={cls.nameWrapper}>
                <h3 className={cls.productName} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>{product.name}</h3>
                <div className={cls.orderInfo}>
                    <p className={cls.orderDate}>Ordered: {new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className={cls.actionButtons}>
                    <button 
                        className={cls.actionButton}
                        onClick={() => isFavorite ? removeFromFavorites(product) : addToFavorites(product)}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <LikeIcon className={cls.likeIcon} fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" />
                    </button>
                    <button 
                        className={cls.actionButton}
                        aria-label="Share product"
                        onClick={() => handleShare(product.id)}
                    >
                        <ShareIcon className={cls.shareIcon} fill="none" stroke="currentColor" />
                    </button>
                </div>
            </div>

            <div className={cls.priceWrapper}>
                <p className={cls.price}>{formatPrice(price * quantity)}</p>
                <p className={cls.quantity}>Qty: {quantity}</p>
            </div>
        </article>
    )
}

export default OrderCard;