// React and Router
import { Link, useNavigate } from 'react-router-dom';

// Styles
import cls from './ProductCard.module.scss';

// Icons & Images
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as BasketIcon } from '@/assets/icons/basket.svg';

// Hooks
import { 
    useAddToFavoritesQuery, 
    useGetFavoritesQuery, 
    useRemoveFromFavoritesQuery 
} from '@/hooks/query/useFavoritesQuery';
import { useAddToBasketQuery, useGetBasketQuery } from '@/hooks/query/useBasketQuery';
import { useAddToRecentlyViewedQuery } from '@/hooks/query/useRecentlyViewedQuery';

// Components
import Button from '@/components/ui/Button/Button';

// Utils
import { BASKET_ROUTE, PRODUCT_ROUTE, SELLER_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';


function ProductCard({product}) {
    // Router
    const navigate = useNavigate()

    // Get queries
    const { data: basketProducts } = useGetBasketQuery()
    const { data: favoriteProducts } = useGetFavoritesQuery()

    // Mutation queries
    const { mutate: addToBasket } = useAddToBasketQuery()
    const { mutate: addToFavorites } = useAddToFavoritesQuery()
    const { mutate: removeFromFavorites } = useRemoveFromFavoritesQuery()
    const { mutate: addToRecentlyViewed } = useAddToRecentlyViewedQuery()

    // Check if product is in basket or favorites
    const isInBasket = basketProducts?.some(basketProduct => basketProduct.product.id === product.id)
    const isInFavorites = favoriteProducts?.some(favoriteProduct => favoriteProduct.product.id === product.id)

    // Handle click function to prevent event bubbling
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    // Handle favorite and basket actions
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
        if (isInBasket) {
            navigate(BASKET_ROUTE)
        } else {
            addToBasket(product)
        }
    }

    // Handle product click to navigate to product page and add to recently viewed
    const handleProductClick = (e) => {
        handleClick(e)
        navigate(`${PRODUCT_ROUTE}/${product.id}`)
        addToRecentlyViewed(product)
    }

    return(
        <article 
            className={cls.ProductCard} 
            onClick={handleProductClick}
            aria-label={`Go to product ${product.name}`}
        >
            <div className={cls.imgWrapper}>
                <img 
                    src={getImageUrl(product.image)}
                    alt={product?.name ? `Product image: ${product.name}` : 'Product image'}
                    className={cls.productImg}
                />
                <button 
                    className={cls.likeButton + ' ' + (isInFavorites ? cls.inFavorites : '')}
                    onClick={handleFavorite}
                    aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
                >
                    <LikeIcon 
                        className={cls.likeIcon} 
                        fill={isInFavorites ? "currentColor" : "none"} 
                        stroke="currentColor" 
                    />
                </button>
            </div>
            <div className={cls.topWrapper}>
                <div className={cls.priceWrapper}>
                    <p className={cls.price}>{formatPrice(product.price)}</p>
                </div>
                <div className={cls.nameWrapper}>
                    <p className={cls.name}>{product.name}</p>
                </div>
                <div className={cls.sellerWrapper}>
                    <Link 
                        onClick={(e) => e.stopPropagation()} 
                        to={`${SELLER_ROUTE}/${product?.seller?.id}`} 
                        className={cls.seller}
                    >
                        {product?.seller?.name}
                    </Link>
                </div>
            </div>
            <div className={cls.bottomWrapper}>
                <div className={cls.addBasketWrapper}>
                    <Button
                        variant={isInBasket ? 'secondary' : 'primary'}
                        onClick={handleBasket}
                    >
                        <BasketIcon className={cls.basketIcon} fill="none" stroke="currentColor" />
                        <p className={cls.text}>
                            {isInBasket ? "Go to basket" : "Add to basket"}
                        </p>
                    </Button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard