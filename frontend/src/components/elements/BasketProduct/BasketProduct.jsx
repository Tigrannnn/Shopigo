// React and Router
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './BasketProduct.module.scss';

// Icons & Images
import { ReactComponent as CheckboxCheckIcon } from '@/assets/icons/checkbox-check.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';

// Hooks
import useHandleShare from '@/hooks/useHandleShare';
import { 
    useDecreaseQuantityQuery, 
    useIncreaseQuantityQuery, 
    useRemoveFromBasketQuery, 
    useToggleSelectedQuery 
} from '@/hooks/query/useBasketQuery';
import { 
    useAddToFavoritesQuery, 
    useGetFavoritesQuery, 
    useRemoveFromFavoritesQuery 
} from '@/hooks/query/useFavoritesQuery';

// Utils
import { PRODUCT_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';


function BasketProduct ({basketProduct}) {
    // Router
    const navigate = useNavigate()

    // Basket product
    const { id, product, quantity, selected } = basketProduct
    const totalPrice = product.price * quantity

    // Get queries
    const { data: favoriteProducts } = useGetFavoritesQuery()

    // Mutation queries
    const { mutate: removeFromBasket } = useRemoveFromBasketQuery()

    const { mutate: increaseQuantity } = useIncreaseQuantityQuery()
    const { mutate: decreaseQuantity } = useDecreaseQuantityQuery()

    const { mutate: toggleSelected } = useToggleSelectedQuery()

    const { mutate: addToFavorites } = useAddToFavoritesQuery()
    const { mutate: removeFromFavorites } = useRemoveFromFavoritesQuery()

    // Check if product is in favorites
    const isFavorite = favoriteProducts?.some(favoriteProduct => 
        favoriteProduct.product.id === product.id
    )

    // Handle share hook
    const handleShare = useHandleShare()

    return(
        <article className={cls.BasketProduct}>
            <label htmlFor={id} className="neon-checkbox">
                <input 
                    type="checkbox" 
                    id={id} 
                    checked={selected} 
                    onChange={() => toggleSelected(basketProduct)}
                    aria-label="Select product"
                />
                <div className="neon-checkbox__frame">
                    <div className="neon-checkbox__box"></div>
                    <CheckboxCheckIcon className="neon-checkbox__check" />
                    <div className="neon-checkbox__glow"></div>
                </div>
            </label>
            <div className={cls.imgWrapper}>
                <img 
                    src={getImageUrl(product.image)} 
                    alt={product?.name ? `Product image: ${product.name}` : 'Product image'}
                    className={cls.productImage}
                    onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}
                />
            </div>
            <div className={cls.infoWrapper}>
                <span className={cls.price}>{formatPrice(product.price * quantity)}</span>
                <div className={cls.productNameWrapper}>
                    <h3 className={cls.productName} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>{product.name}</h3>
                </div>
                <div className={cls.bottomButtons}>
                    <div className={cls.quantityControls}>
                        <button 
                            className={quantity > 1 ? cls.btn : ` ${cls.btn} ${cls.disabledBtn}`} 
                            onClick={() => quantity <= 1 ? '' : decreaseQuantity(basketProduct)}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className={cls.quantity}>{quantity}</span>
                        <button 
                            className={cls.btn} 
                            onClick={() => increaseQuantity(basketProduct)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
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
                        <button 
                            className={cls.actionButton}
                            aria-label="Remove from basket"
                            onClick={() => removeFromBasket(basketProduct)}
                        >
                            <TrashIcon className={cls.trashIcon} fill="none" stroke="currentColor" />
                        </button>
                    </div>
                </div>
            </div>

            <span className={cls.price}>{formatPrice(totalPrice)}</span>
            
            <div className={cls.quantityControls}>
                <button 
                    className={quantity > 1 ? cls.btn : ` ${cls.btn} ${cls.disabledBtn}`} 
                    onClick={() => decreaseQuantity(basketProduct)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <span className={cls.quantity}>{quantity}</span>
                <button 
                    className={cls.btn} 
                    onClick={() => increaseQuantity(basketProduct)}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </article>
    )
}

export default BasketProduct