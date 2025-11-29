import { useNavigate } from 'react-router-dom'
import cls from '../styles/ProductPage.module.scss'
import { useState } from 'react'
import { ReactComponent as LikeIcon } from '../assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '../assets/icons/share.svg';
import { ReactComponent as CommentIcon } from '../assets/icons/comment.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg';
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { useColorVariantState } from '../store/useColorVariantState';
import ColorVariantModal from '../components/ColorVariantModal';
import { useSellerInfoState } from '../store/useSellerInfoState';
import SellerInfoModal from '../components/SellerInfoModal';
import { useProductsState } from '../store/useProductsState';
import { useParams } from 'react-router-dom';
import { useBasketState } from '../store/useBasketState';
import { useFavoritesState } from '../store/useFavoritesState';
import { BASKET_ROUTE, PRODUCT_ROUTE, QUESTION_ROUTE, REVIEW_ROUTE } from '../utils/consts';
import { useToastState } from '../store/useToastState';
import Comment from '../components/Comment';
import { useFeedbackState } from '../store/useFeedbackState';
import { useEffect } from 'react';
import RecomendedBlock from '../components/RecommendedBlock.jsx'
import { getOneProduct } from '../http/productApi';
import Loader from '../components/Loader';

function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const [selectSize, setSelectSize] = useState(null)
    const [selectColor, setSelectColor] = useState('')

    const openColorVariantModal = useColorVariantState(state => state.openColorVariantModal)
    const closeColorVariantModal = useColorVariantState(state => state.closeColorVariantModal)

    const isSellerInfoModalOpen = useSellerInfoState(state => state.isSellerInfoModalOpen)
    const openSellerInfoModal = useSellerInfoState(state => state.openSellerInfoModal)
    const closeSellerInfoModal = useSellerInfoState(state => state.closeSellerInfoModal)

    const addToBasket = useBasketState(state => state.addToBasket)
    const basketProducts = useBasketState(state => state.basketProducts)
    const removeFromBasket = useBasketState(state => state.removeFromBasket)
    const isBasket = basketProducts.some(item => item.id === product.id)

    const addToFavorites = useFavoritesState(state => state.addToFavorites)
    const removeFromFavorites = useFavoritesState(state => state.removeFromFavorites)
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)
    const isFavorite = favoriteProducts.some(item => item.id === product.id)

    const toast = useToastState(state => state.toast)

    const feedback = useFeedbackState(state => state.feedback)
    const setFeedback = useFeedbackState(state => state.setFeedback)

    useEffect(() => {
        document.title = product?.name || 'Product'
        setFeedback('reviews')
        closeSellerInfoModal();
        getOneProduct(id).then(data => {
            setProduct(data)
            setLoading(false)
        });
    }, []);


    // function handleColorVariantHover(e, index) {
    //     const button = e.currentTarget;
    //     const rect = button.getBoundingClientRect();
    //     const containerRect = button.closest(`.${cls.colorVariantsWrapper}`).getBoundingClientRect();

    //     setSelectColor(product.variants.colors[index])

    //     const position = {
    //         left: rect.left - containerRect.left,
    //     };

    //     openColorVariantModal(position);
    // }

    function handleBasketAction(e) {
        e.stopPropagation();
        e.preventDefault();
        if (isBasket) {
            navigate(BASKET_ROUTE)
        } else {
            addToBasket(product)
        }
    }

    function handleCopyArticleNumber(e) {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(product.article)
        toast('Article number copied', false)
    }

    function handleShare() {
        
    }

    if (loading) return <Loader />

    return(
        <div className={cls.ProductPage}>
            <section className={cls.topSection}>
                <nav className={cls.breadcrumbs} aria-label="Breadcrumb navigation">
                    <button 
                        className={cls.backButton}
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <BackIcon />
                    </button>
                    <ul>
                        {/* <li onClick={() => navigate(CATALOG_ROUTE + `/${product.categoryId}`)}>{categories.find(item => item.id === product.categoryId).name}</li> */}
                        <span aria-hidden="true">›</span>
                        {/* <li onClick={() => navigate(SELLER_ROUTE + `/${product.seller.id}`)}>{product.seller.name}</li> */}
                    </ul>
                </nav>
                
                <div className={cls.productActions}>
                    <button 
                        className={cls.actionButton}
                        onClick={() => isFavorite ? removeFromFavorites(product) : addToFavorites(product)}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <LikeIcon className={cls.likeIcon} fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" />
                    </button>
                    <button 
                        className={cls.actionButton}
                        onClick={() => handleShare()}
                        aria-label="Share product"
                    >
                        <ShareIcon className={cls.shareIcon} />
                    </button>
                    <button 
                        className={cls.actionButton}
                        aria-label="View comments"
                    >
                        <CommentIcon className={cls.commentIcon} />
                    </button>
                </div>
            </section>

            <section className={cls.mainSection}>
                <div className={cls.sliders}>
                    <div className={cls.leftSide}>
                        {/* {product.images.map((image, index) => (
                            <img key={index} src={image} alt="" />
                        ))} */}
                        <img src={process.env.REACT_APP_API_URL + product.image} alt="" />
                    </div>
                    <div className={cls.rightSide}>
                        <img src={process.env.REACT_APP_API_URL + product.image} alt="" />
                    </div>
                </div>
                
                <div className={cls.infoWrapper}>
                    <div className={cls.nameWrapper}>
                        <h1>{product.name}</h1>
                        <ul>
                            <li
                                onClick={() => navigate(`${PRODUCT_ROUTE}/${id}${REVIEW_ROUTE}`)}
                            >
                                <StarIcon className={cls.starIcon} fill="currentColor" />
                                <span>{product.rating}</span>
                                <button>{product.reviews} Reviews ›</button>
                            </li>
                            <span aria-hidden="true">·</span>
                            <li
                                onClick={() => navigate(`${PRODUCT_ROUTE}/${id}${QUESTION_ROUTE}`)}
                            >
                                <CommentIcon className={cls.commentIcon} />
                                <button>{product.questions} Questions ›</button>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={cls.variantsBlockWrapper}>
                        <ColorVariantModal product={product} color={selectColor} />
                        <div className={cls.colorVariantsWrapper}>
                            {/* {product.variants.colors.map((color, index) => (
                                <div key={color.color}>
                                    <img 
                                        src={color.image} alt="" 
                                        onMouseOver={(e) => handleColorVariantHover(e, index)}
                                        onMouseLeave={closeColorVariantModal}
                                    />
                                </div>
                            ))} */}
                        </div>
                        
                        <div className={cls.sizeVariantsWrapper}>
                            {/* {product.variants.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${cls.sizeVariant} ${selectSize === size ? cls.selected : ''}`}
                                    aria-label={`Select size ${size}`}
                                    onClick={() => setSelectSize(size)}
                                >
                                    <span>{size}</span>
                                </button>
                            ))} */}
                        </div>
                    </div>
                    
                    <div className={cls.paramsWrapper}>
                        <ul>
                            <li>
                                <span>Article Number</span>
                                <button 
                                    onClick={handleCopyArticleNumber}
                                    className={cls.copyButton}
                                    aria-label="Copy article number"
                                >
                                    {product.article}
                                    <CopyIcon className={cls.copyIcon} />
                                </button>
                            </li>
                            <hr />
                            <li>
                                <span>Material</span>
                                <span>{product.material}</span>
                            </li>
                            <hr />
                            <li>
                                <span>Material composition</span>
                                <span>{product.materialComposition}</span>
                            </li>
                            <hr />
                            <li>
                                <span>Style</span>
                                <span>{product.style}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className={cls.priceBoxWrapper}>
                    <SellerInfoModal product={product} />
                    <article className={cls.priceBox}>
                        <div className={cls.priceWrapper}>
                            <h2>{product.price} dram</h2>
                        </div>
                        <div className={cls.buttonsWrapper}>
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
                        <div className={cls.sellerInfoWrapper}>
                            <div className={cls.deliveryInfo}>
                                <BoxIcon className={cls.boxIcon} />
                                <span>Delivery: {product.deliveryDays} days</span>
                            </div>
                            <div 
                                className={cls.sellerInfo} 
                                onClick={isSellerInfoModalOpen ? closeSellerInfoModal : openSellerInfoModal}
                                aria-label="Seller info"
                            >
                                <ShopIcon className={cls.shopIcon} />
                                <span>Seller: {product.seller.name}</span>
                                <div className={cls.sellerRating}>
                                    <StarIcon className={cls.starIcon} fill="currentColor" />
                                    <span className={cls.sellerRatingValue}>{product.seller.rating}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section className={cls.commentsSection}>
                <div className={cls.commentsTitleWrapper}>
                    <h4
                        className={feedback === 'reviews' ? cls.titleActive : ''} 
                        onClick={() => setFeedback('reviews')}
                    >
                        Reviews <sup>{product.reviews}</sup>
                    </h4>
                    <h4
                        className={feedback === 'questions' ? cls.titleActive : ''} 
                        onClick={() => setFeedback('questions')}
                    >
                        Questions <sup>{product.questions}</sup>
                    </h4>
                </div>
                <div className={cls.commentsWrapper}>
                    <Comment />
                    <div className={cls.allComments}>
                        <button 
                            className={cls.allCommentsButton}
                            onClick={() => navigate(`${PRODUCT_ROUTE}/${id}/${feedback}`)}
                        >
                            View all {feedback}
                        </button>
                    </div>
                </div>
            </section>

            <RecomendedBlock />
        </div>
    )
}

export default ProductPage