import cls from '../styles/pages/Favorites.module.scss'
import ProductCard from '../components/ProductCard.jsx'
import { useFavoritesState } from '../store/useFavoritesState'
import { Link } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'
import RecomendedBlock from '../components/RecommendedBlock.jsx'
import { useEffect } from 'react'

function Favorites() {
    useEffect(() => {
        document.title = 'Favorites'
    }, [])
    const favoriteProducts = useFavoritesState(state => state.favoriteProducts)

    return(
        <div className={cls.Favorites}>
            {
                favoriteProducts.length === 0 ? (
                    <div className={cls.emptyFavorites}>
                        <h1>Favorites is empty</h1>
                        <h2>Take a look at the main page <br/> We have collected products there that you might like</h2>
                        <Link to={SHOP_ROUTE} className={cls.goToMainPage}>Go to main page</Link>
                    </div>
                ) : (
                    <>
                        <header className={cls.favoritesHeader}>
                            <h1>Favorites <sup>{favoriteProducts.length}</sup></h1>
                        </header>
                        <div className={cls.mainBlock}>
                            <div className={cls.productListBlock}>
                                {favoriteProducts.map((product) => (
                                    <ProductCard key={product.id} product={product}/>
                                ))}
                            </div>
                        </div>
                    </>
                )
            }

            <RecomendedBlock />
        </div>
    )
}

export default Favorites