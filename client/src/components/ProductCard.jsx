import cls from '../styles/ProductCard.module.scss'
import { useNavigate } from "react-router-dom"
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as BasketIcon } from '../assets/icons/basket.svg';
import { useBasketState } from '../store/useBasketState';
import { useFavoritesState } from '../store/useFavoritesState';
import { BASKET_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE } from '../utils/consts';
import { useOrderState } from '../store/useOrderState';
import { useRecentlyWatchedState } from '../store/useRecentlyWatchedState';

function ProductCard({product}) {
    const addToBasket = useBasketState(state => state.addToBasket)
    const basketProducts = useBasketState(state => state.basketProducts)
    const isInBasket = basketProducts.some(item => item.id === product.id)
    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isInFavorites = favoriteProducts.some(item => item.id === product.id)
    const orderProducts = useOrderState(state => state.orderProducts)
    const isInOrder = orderProducts.some(item => item.id === product.id)
    const addRecentlyWatched = useRecentlyWatchedState(state => state.addRecentlyWatched)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleFavorite = (e) => {
        handleClick(e)
        if (!isInFavorites) {
            addToFavorites(product)
        } else {
            removeFromFavorites(product)
        }
    }

    const handleBasket = (e) => {
        handleClick(e)
        if (!isInBasket && !isInOrder) {
            addToBasket(product)
        } else if (isInBasket) {
            navigate(BASKET_ROUTE)
        } else if (isInOrder) {
            navigate(ORDERS_ROUTE)
        }
    }

    const handleProductClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`${PRODUCT_ROUTE}/${product.id}`)
        addRecentlyWatched(product)
    }

    return(
        <article 
            className={cls.ProductCard} 
            onClick={handleProductClick}
            aria-label={`Go to product ${product.name}`}
        >
            <div className={cls.imgWrapper}>
                <img 
                    src={process.env.REACT_APP_API_URL + product.image}
                    alt="" 
                    className={cls.productImg}
                />
                <button 
                    className={cls.likeButton + ' ' + (isInFavorites ? cls.inFavorites : '')}
                    onClick={handleFavorite}
                    aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
                >
                    <LikeIcon className={cls.likeIcon} fill={isInFavorites ? "currentColor" : "none"} stroke="currentColor" />
                </button>
            </div>
            <div className={cls.topWrapper}>
                <div className={cls.priceWrapper}>
                    <p className={cls.price}>{product.price} dram</p>
                </div>
                <div className={cls.nameWrapper}>
                    <p className={cls.name}>{product.name}</p>
                </div>
                <div className={cls.sellerWrapper}>
                    {/* <p className={cls.seller}>{product.seller.name}</p> */}
                </div>
            </div>
            <div className={cls.bottomWrapper}>
                <div className={cls.ratingWrapper}>
                    <StarIcon className={cls.starIcon} fill="currentColor" />
                    <p className={cls.rating}>{product.rating}</p>
                </div>
                <div className={cls.addBasketWrapper}>
                    <button 
                        className={`${cls.addBasketButton} ${isInBasket ? cls.inBasket : isInOrder ? cls.inOrder : ''}`} 
                        onClick={handleBasket}
                    >
                        <BasketIcon className={cls.basketIcon} fill="none" stroke="currentColor" />
                        <p className={cls.deliveryText}>
                            {isInBasket ? "Go to basket" : isInOrder ? "Go to orders" : product.deliveryDays ? `From ${product.deliveryDays} days` : "Add to basket"}
                        </p>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard