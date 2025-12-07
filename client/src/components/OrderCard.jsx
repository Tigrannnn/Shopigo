import cls from '../styles/components/OrderCard.module.scss'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg'
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg'
import { useFavoritesState } from '../store/useFavoritesState'
import { useOrderState } from '../store/useOrderState'

function OrderCard({product, key}) {
    const navigate = useNavigate()
    const { id, name, color, deliveryDays, images, price, quantity, orderDate, status, orderId } = product

    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isFavorite = favoriteProducts.some(item => item.id === id)

    const removeOrder = useOrderState(state => state.removeOrder)

    const handleRemoveOrder = () => {
        if (window.confirm('Are you sure you want to remove this order?')) {
            removeOrder(orderId)
        }
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return '#f39c12'
            case 'processing': return '#3498db'
            case 'shipped': return '#9b59b6'
            case 'delivered': return '#27ae60'
            case 'cancelled': return '#e74c3c'
            default: return '#95a5a6'
        }
    }

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Pending'
            case 'processing': return 'Processing'
            case 'shipped': return 'Shipped'
            case 'delivered': return 'Delivered'
            case 'cancelled': return 'Cancelled'
            default: return 'Unknown'
        }
    }

    return (
        <article className={cls.OrderCard} key={key}>
            <div className={cls.imgWrapper} onClick={() => navigate(`/product/${id}`)}>
                <img 
                    src={images?.[0]} 
                    alt={name} 
                    className={cls.productImage} 
                />
            </div>

            <div className={cls.nameWrapper}>
                <h3 className={cls.productName} onClick={() => navigate(`/product/${id}`)}>{name}</h3>
                <p className={cls.productColor}>{color} White</p>
                <p className={cls.productDate}>From {deliveryDays} days</p>
                <div className={cls.orderInfo}>
                    <p className={cls.orderDate}>Ordered: {orderDate || 'Today'}</p>
                    <div className={cls.statusWrapper}>
                        <span 
                            className={cls.status} 
                            style={{backgroundColor: getStatusColor(status)}}
                        >
                            {getStatusText(status)}
                        </span>
                    </div>
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
                    >
                        <ShareIcon className={cls.shareIcon} fill="none" stroke="currentColor" />
                    </button>
                    <button 
                        className={cls.actionButton}
                        onClick={handleRemoveOrder}
                        aria-label="Remove order"
                    >
                        <TrashIcon className={cls.trashIcon} fill="none" stroke="currentColor" />
                    </button>
                </div>
            </div>

            <div className={cls.priceWrapper}>
                <p className={cls.price}>{price * quantity} dram</p>
                <p className={cls.quantity}>Qty: {quantity}</p>
            </div>
        </article>
    )
}

export default OrderCard;