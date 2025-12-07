import cls from '../styles/components/BasketProduct.module.scss'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CheckboxCheckIcon } from '../assets/icons/checkbox-check.svg'
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg'
import { useBasketState } from '../store/useBasketState'
import { useFavoritesState } from '../store/useFavoritesState'
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg'
import useHandleShare from '../utils/useHandleShare'

function BasketProduct ({checkedAll, product}) {
    const { id, name, color, deliveryDays, image, price, quantity } = product

    const removeFromBasket = useBasketState(state => state.removeFromBasket)

    const increaseQuantity = useBasketState(state => state.increaseQuantity)
    const decreaseQuantity = useBasketState(state => state.decreaseQuantity)

    // const toggleSelected = useBasketState(state => state.toggleSelected)
    // const selectedIds = useBasketState(state => state.selectedIds)

    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isFavorite = favoriteProducts.some(item => item.id === id)

    const navigate = useNavigate()

    const handleShare = useHandleShare()

    return(
        <article className={cls.BasketProduct}>
            <label htmlFor={id} className="neon-checkbox">
                <input 
                    type="checkbox" 
                    id={id} 
                    // checked={checkedAll ? checkedAll : selectedIds.includes(id)} 
                    // onChange={() => toggleSelected(id)}
                    aria-label="Select product"
                />
                <div className="neon-checkbox__frame">
                    <div className="neon-checkbox__box"></div>
                    <CheckboxCheckIcon className="neon-checkbox__check" />
                    <div className="neon-checkbox__glow"></div>
                </div>
            </label>
            
            <div className={cls.imgWrapper} onClick={() => navigate(`/product/${id}`)}>
                <img 
                    src={process.env.REACT_APP_API_URL + image} 
                    alt="" 
                    className={cls.productImage} 
                />
            </div>
            
            <div className={cls.nameWrapper}>
                <h3 className={cls.productName} onClick={() => navigate(`/product/${id}`)}>{name}</h3>
                <p className={cls.productColor}>{color} White</p>
                <p className={cls.productDate}>From {deliveryDays} days</p>
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
                        onClick={() => handleShare(id)}
                    >
                        <ShareIcon className={cls.shareIcon} fill="none" stroke="currentColor" />
                    </button>
                    <button 
                        className={cls.actionButton}
                        aria-label="Remove from basket"
                        onClick={() => removeFromBasket(product)}
                    >
                        <TrashIcon className={cls.trashIcon} fill="none" stroke="currentColor" />
                    </button>
                </div>
            </div>
            
            <div className={cls.priceWrapper}>
                <p className={cls.price}>{price * quantity} dram</p>
            </div>
            
            <div className={cls.addWrapper}>
                <div className={cls.quantityControls}>
                    <button 
                        className={quantity > 1 ? cls.btn : ` ${cls.btn} ${cls.disabledBtn}`} 
                        onClick={() => quantity <= 1 ? '' : decreaseQuantity(id)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span className={cls.quantity}>{quantity}</span>
                    <button 
                        className={cls.btn} 
                        onClick={() => increaseQuantity(id)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    )
}

export default BasketProduct