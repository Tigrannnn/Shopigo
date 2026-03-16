// React and Router
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Styles
import cls from './Feedback.module.scss';

// Icons & Images
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg';
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';

// Hooks & State
import { useFeedbackState } from '@/store/useFeedbackState';
import { useFavoritesState } from '@/store/useFavoritesState';
import { useBasketState } from '@/store/useBasketState';
import { useModalState } from '@/store/useModalState';

// API
import { getOneProduct } from '@/http/productApi';

// Utils
import { BASKET_ROUTE, PRODUCT_ROUTE, SELLER_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';

// Components
import Comment from '@/components/elements/Comment/Comment';
import Loader from '@/components/ui/Loader/Loader';


function Feedback() {
    const feedback = useFeedbackState((state) => state.feedback)
    const location = useLocation()

    const openModal = useModalState(state => state.openModal)

    const { id } = useParams()
    const [product, setProduct] = useState({})

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOneProduct(id).then(data => {
            setProduct(data)
        }).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        document.title = 'hello'
    }, [product, location.pathname])

    console.log(product);
    

    const addToBasket = useBasketState(state => state.addToBasket)
    const basketProducts = useBasketState(state => state.basketProducts)
    const removeFromBasket = useBasketState(state => state.removeFromBasket)
    const isBasket = basketProducts.some(item => item.id === product.id)

    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isFavorite = favoriteProducts.some(item => item.id === product.id)

    const navigate = useNavigate()

    function handleBasketAction(e) {
        e.stopPropagation();
        e.preventDefault();
        if (isBasket) {
            navigate(BASKET_ROUTE)
        } else {
            addToBasket(product)
        }
    }

    if (loading) return <Loader />

    return (
        <div className={cls.Feedback}>
            <div className={cls.header}>
                <div className={cls.headerTop}>
                    <button className={cls.backButton} onClick={() => navigate(-1)}>
                        <BackIcon />
                        <span>Back</span>
                    </button>
                </div>
                <div className={cls.headerBottom}>
                    {/* <img src={product.images[0]} alt="" onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}/> */}
                    <img src={getImageUrl(product.image)} alt="" onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}/>
                    <div className={cls.headerBottomInfo}>
                        <Link to={`${PRODUCT_ROUTE}/${product.id}`}>{product.name}</Link>
                        <Link to={`${SELLER_ROUTE}/${product.seller.id}`}>{product.seller.name}</Link>
                        <span><StarIcon fill="currentColor"/> {product.rating} ∙ <p>83,964 product ratings</p></span>
                    </div>
                    <div className={cls.headerBottomPrice}>
                        <h3>{formatPrice(product.price)}</h3>
                    </div>
                    <div className={cls.headerBottomButtons}>
                        <div className={cls.leftSide}>
                            <button 
                                className={isBasket ? cls.secondaryButton : ''} 
                                onClick={handleBasketAction}
                            >
                                <p>{isBasket ? "Go to Basket" : "Add to Basket"}</p>
                            </button>
                            <button 
                                className={isBasket ? '' : cls.secondaryButton}
                                onClick={() => isBasket ? removeFromBasket(product) : ''}
                            >
                                <p>{isBasket ? "Remove from Basket" : "Buy Now"}</p>
                            </button>
                        </div>
                        <button
                            className={cls.likeButton}
                            onClick={() => isFavorite ? removeFromFavorites(product) : addToFavorites(product)}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <LikeIcon fill={isFavorite ? "currentColor" : "none"} stroke="currentColor"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={cls.feedbacks}>
                <div className={cls.feedbackTopSide}>
                    <h4>Reviews</h4>

                    <div className={cls.feedbackTopSideWrite}>
                        <button onClick={() => openModal('writeReview')}>
                            Write review
                        </button>
                    </div>

                    <div className={cls.feedbackTopSideSort}>
                        <span>Sort by:</span>
                        <select>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="highestRating">Highest Rating</option>
                            <option value="lowestRating">Lowest Rating</option>
                        </select>
                    </div>
                </div>

                <div className={cls.commentList}>
                    <Comment product={product}/>
                    <Comment product={product}/>
                    <Comment product={product}/>
                    <Comment product={product}/>
                </div>
            </div>
        </div>
    );
}

export default Feedback;