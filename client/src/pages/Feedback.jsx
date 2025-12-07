import { useFeedbackState } from '../store/useFeedbackState';
import cls from '../styles/pages/Feedback.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductsState } from '../store/useProductsState';
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg';
import { BASKET_ROUTE, PRODUCT_ROUTE } from '../utils/consts';
import { useFavoritesState } from '../store/useFavoritesState';
import { useBasketState } from '../store/useBasketState';
import { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';
import { REVIEW_ROUTE, QUESTION_ROUTE } from '../utils/consts';
import { getOneProduct } from '../http/productApi';
import Loader from '../components/Loader';

function Feedback() {
    const feedback = useFeedbackState((state) => state.feedback)
    const location = useLocation()

    const { id } = useParams()
    const [product, setProduct] = useState({})

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOneProduct(id).then(data => {
            setProduct(data)
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        const isReviewPage = location.pathname.includes(REVIEW_ROUTE)
        const isQuestionPage = location.pathname.includes(QUESTION_ROUTE)
        
        if (isReviewPage) {
            document.title = `${product?.name} - Reviews` || 'Reviews'
        } else if (isQuestionPage) {
            document.title = `${product?.name} - Questions` || 'Questions'
        } else {
            document.title = `${product?.name} - 'Feedback'` || 'Feedback'
        }
    }, [product, location.pathname])

    console.log(product);
    

    const addToBasket = useBasketState(state => state.addToBasket)
    const basketProducts = useBasketState(state => state.basketProducts)
    const removeFromBasket = useBasketState(state => state.removeFromBasket)
    const isBasket = basketProducts.some(item => item.id === id)

    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isFavorite = favoriteProducts.some(item => item.id === id)

    const [reviewVariant, setReviewVariant] = useState('this')

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
            {
                feedback === 'reviews' ? (
                    <>
                        <div className={cls.header}>
                            <div className={cls.headerTop}>
                                <button className={cls.backButton} onClick={() => navigate(-1)}>
                                    <BackIcon />
                                    <span>Back</span>
                                </button>
                            </div>
                            <div className={cls.headerBottom}>
                                {/* <img src={product.images[0]} alt="" onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}/> */}
                                <img src={process.env.REACT_APP_API_URL + product.image} alt="" onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}/>
                                <div className={cls.headerBottomInfo}>
                                    <Link to={`${PRODUCT_ROUTE}/${product.id}`}><h3>{product.seller.name}</h3> / <p>{product.name}</p></Link>
                                    <span><StarIcon fill="currentColor"/> {product.rating} ∙ <p>83,964 product ratings</p></span>
                                </div>
                                <div className={cls.headerBottomPrice}>
                                    <h3>{product.price} dram</h3>
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
                                <div className={cls.feedbackTopSideTitles}>
                                    <h4
                                        className={reviewVariant === 'this' ? cls.titleActive : ''}
                                        onClick={() => setReviewVariant('this')}
                                    >
                                        This product variant reviews <sup>15</sup>
                                    </h4>
                                    <h4
                                        className={reviewVariant === 'all' ? cls.titleActive : ''}
                                        onClick={() => setReviewVariant('all')}
                                    >
                                        All Rewiews <sup>45</sup>
                                    </h4>
                                </div>

                                <div className={cls.feedbackTopSideWrite}>
                                    <button>Write a review</button>
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
                    </>
                ) : (
                    <>
                        <h2>Questions Section</h2>
                    </>
                )
            }
        </div>
    );
}

export default Feedback;