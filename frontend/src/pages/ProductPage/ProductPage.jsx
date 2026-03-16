// React and Router
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// Styles
import cls from './ProductPage.module.scss';

// SEO
import { Helmet } from 'react-helmet-async';

// Icons & Images
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { ReactComponent as ShopIcon } from '@/assets/icons/shop.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy.svg';
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg';

// Hooks
import { useToastState } from '@/store/useToastState';
import useHandleShare from '@/hooks/useHandleShare';
import { useGetProductByIdQuery } from '@/hooks/query/useProductQuery';
import {
    useAddToBasketQuery,
    useGetBasketQuery,
    useRemoveFromBasketQuery
} from '@/hooks/query/useBasketQuery';
import {
    useAddToFavoritesQuery,
    useGetFavoritesQuery,
    useRemoveFromFavoritesQuery
} from '@/hooks/query/useFavoritesQuery';
import { useBuyNowQuery } from '@/hooks/query/useOrdersQuery';
import { useAuthQuery } from '@/hooks/query/useUsersQuery';

// Utils
import { BASKET_ROUTE, CATEGORY_ROUTE, LOGIN_ROUTE, SELLER_ROUTE } from '@/utils/constants/routes';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';

// Components
import SellerInfoModal from '@/components/elements/modals/SellerModal/SellerInfoModal';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import Loader from '@/components/ui/Loader/Loader';


function ProductPage() {
    // Router
    const navigate = useNavigate()
    const { id } = useParams()

    // Get queries
    const { data: product, isLoading } = useGetProductByIdQuery(id)
    const { data: basketProducts } = useGetBasketQuery()
    const { data: favoriteProducts } = useGetFavoritesQuery()
    const { data: user } = useAuthQuery()

    // Mutation queries
    const { mutate: addToBasket } = useAddToBasketQuery()
    const { mutate: removeFromBasket } = useRemoveFromBasketQuery()

    const { mutate: addToFavorites } = useAddToFavoritesQuery()
    const { mutate: removeFromFavorites } = useRemoveFromFavoritesQuery()

    const { mutate: buyNow } = useBuyNowQuery()

    // Check if product is in basket or favorites
    // protect against queries not having data yet (product or lists may be undefined)
    const isInFavorites =
        favoriteProducts?.some((item) => item.product.id === product?.id);
    const isInBasket =
        basketProducts?.some((item) => item.product.id === product?.id);
    
    // Toast
    const toast = useToastState(state => state.toast)

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const canonicalUrl = `${baseUrl}/product/${id}`;

    const seo = useMemo(() => {
        if (!product) {
            return {
                title: 'Product — Shopigo',
                description: 'Browse products on Shopigo and place orders in seconds.',
                ogImage: `${baseUrl}/logo.png`,
            };
        }

        const title = `${product.name} — Buy from ${product.seller?.name || 'seller'} | Shopigo`;
        const description = (product.description || '')
            .toString()
            .slice(0, 160) || 'Shopigo product page — view details, save to favorites, and add to basket.';

        return {
            title,
            description,
            ogImage: getImageUrl(product.image),
        };
    }, [product, baseUrl])

    // Handle basket action
    function handleBasketAction(e) {
        e.stopPropagation();
        e.preventDefault();
        if (isInBasket) {
            navigate(BASKET_ROUTE)
        } else {
            addToBasket(product)
        }
    }

    // Handle buy now action
    function handleBuyNow(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!user) {
            navigate(LOGIN_ROUTE);
            return;
        }
        buyNow({ productId: product.id, quantity: 1 })
    }

    // Handle copy article number
    function handleCopyArticleNumber(e) {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(product.article)
        toast('Article number copied', false)
    }

    // Handle share hook
    const handleShare = useHandleShare()

    if (isLoading) return <Loader />

    return(
        <div className={cls.ProductPage}>
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:type" content="product" />
                <meta property="og:site_name" content="Shopigo" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={seo.ogImage} />
            </Helmet>
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
                        <li 
                            onClick={() => 
                                navigate(CATEGORY_ROUTE + `/${product.category.id}`)
                            }
                        >
                            {capitalizeFirstLetter(product.category.name)}
                        </li>
                        <span aria-hidden="true">›</span>
                        <li 
                            onClick={() => 
                                navigate(SELLER_ROUTE + `/${product.seller.id}`)
                            }
                        >
                            {product.seller.name}
                        </li>
                    </ul>
                </nav>
                
                <div className={cls.productActions}>
                    <button 
                        className={cls.actionButton}
                        onClick={() => isInFavorites ? removeFromFavorites(product) : addToFavorites(product)}
                        aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
                    >
                        <LikeIcon className={cls.likeIcon} fill={isInFavorites ? "currentColor" : "none"} stroke="currentColor" />
                    </button>
                    <button 
                        className={cls.actionButton}
                        aria-label="Share product"
                        onClick={() => handleShare(id)}
                    >
                        <ShareIcon className={cls.shareIcon} />
                    </button>
                </div>
            </section>

            <section className={cls.mainSection}>
                <div className={cls.sliders}>
                    <div className={cls.rightSide}>
                        <img
                            src={getImageUrl(product.image)}
                            alt={product?.name ? `Product image: ${product.name}` : 'Product image'}
                        />
                    </div>
                </div>
                
                <div className={cls.infoWrapper}>
                    <div className={cls.nameWrapper}>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
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
                        </ul>
                    </div>
                </div>
                
                <div className={cls.priceBoxWrapper}>
                    <SellerInfoModal product={product} />
                    <article className={cls.priceBox}>
                        <div className={cls.priceWrapper}>
                            <h2>{formatPrice(product.price)}</h2>
                        </div>
                        <div className={cls.buttonsWrapper}>
                            <button 
                                className={isInBasket ? cls.secondaryButton : ''} 
                                onClick={handleBasketAction}
                            >
                                <p>{isInBasket ? "Go to Basket" : "Add to Basket"}</p>
                            </button>
                            <button 
                                className={isInBasket ? '' : cls.secondaryButton}
                                onClick={(e) => isInBasket ? removeFromBasket(product) : handleBuyNow(e)}
                            >
                                <p>{isInBasket ? "Remove from Basket" : "Buy Now"}</p>
                            </button>
                        </div>
                        <div className={cls.sellerInfoWrapper}>
                            <div 
                                className={cls.sellerInfo} 
                                onClick={() => navigate(SELLER_ROUTE + `/${product.seller.id}`)}
                                aria-label="Seller info"
                            >
                                <ShopIcon className={cls.shopIcon} />
                                <span>Seller: {product.seller.name}</span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <RecommendedBlock />
        </div>
    )
}

export default ProductPage