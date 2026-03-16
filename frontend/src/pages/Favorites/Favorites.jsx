// Router
import { useNavigate } from 'react-router-dom';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Favorites.module.scss';

// Utils
import { SHOP_ROUTE } from '@/utils/constants/routes';

// Components
import RecentlyViewed from '@/components/containers/RecentlyViewed/RecentlyViewed';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import ProductList from '@/components/containers/ProductList/ProductList';
import { useGetFavoritesQuery } from '@/hooks/query/useFavoritesQuery';
import { Loader } from 'lucide-react';


function Favorites() {
    // Router
    const navigate = useNavigate()

    // Get Queries
    const { data: favoriteProducts, isLoading } = useGetFavoritesQuery()

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Favorites — Shopigo';
    const description = 'Your saved items on Shopigo. Review favorites and add them to your basket.';

    return(
        <div className={cls.Favorites}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/favorites`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/favorites`} />
            </Helmet>
            {
                isLoading ? (
                    <Loader />
                ) : favoriteProducts?.length === 0 ? (
                    <div className={cls.emptyFavorites}>
                        <h1>Favorites is empty</h1>
                        <h2>Take a look at the main page <br/> We have collected products there that you might like</h2>
                        <button onClick={() => navigate(SHOP_ROUTE)}>Go to main page</button>
                    </div>
                ) : (
                    <>
                        <header className={cls.favoritesHeader}>
                            <h1>Favorites <sup>{favoriteProducts?.length}</sup></h1>
                        </header>
                        <ProductList products={favoriteProducts.map(favoriteProduct => favoriteProduct.product)} />
                    </>
                )
            }

            <RecentlyViewed />
            <RecommendedBlock />
        </div>
    )
}

export default Favorites