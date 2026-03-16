// Router
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Catalog.module.scss';

// Utils
import { SHOP_ROUTE } from '@/utils/constants/routes';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

// Hooks
import { useGetCategoryByIdQuery } from '@/hooks/query/useCategoryQuery';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';
import { useObserver } from '@/hooks/useObserver';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// Components
import NotFound from '@/pages/NotFound/NotFound';
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';
import Loader from '@/components/ui/Loader/Loader';
import ProductList from '@/components/containers/ProductList/ProductList';

function Catalog() {
  const navigate = useNavigate()
  const { id } = useParams()
  const infiniteScrollRef = useRef()
  const limit = useResponsiveProductLimit({ rows: 3 });

  const { data: category, isLoading: isCategoryLoading } = useGetCategoryByIdQuery(id)
  const {
    data,
    isLoading: isProductsLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetProductsQuery({ category, limit })

  const categoryProducts = data ? data.pages.flatMap((p) => p.products ?? p) : []

  useObserver(infiniteScrollRef, () => fetchNextPage(), isFetchingNextPage, hasNextPage)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const categoryName = capitalizeFirstLetter(category?.name) || 'Category';
  const title = `${categoryName} — Category | Shopigo`;
  const description = category?.name
    ? `Browse ${categoryName} products on Shopigo and discover new items.`
    : 'Browse products by category on Shopigo.';
  const canonicalUrl = `${baseUrl}/category/${id}`;

  const allPagesLoaded = !hasNextPage && !isFetchingNextPage

  if (isCategoryLoading) return <Loader />

  return (
    <div className={cls.Catalog}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      {
        !category?.id && (
          <>
            <NotFound />
          </>
        )
      }
      {
        category?.id && (
          isProductsLoading && categoryProducts.length === 0 ? (
            <Loader />
          ) : categoryProducts.length <= 0 ? (
            <div className={cls.emptyCatalog}>
              <h1>{capitalizeFirstLetter(category?.name)}</h1>
              <div>
                <h2>No products in this category yet <br/> We will add them soon</h2>
                <h3>Take a look at the main page <br/> We have collected products there that you might like</h3>
              </div>
              <button onClick={() => navigate(SHOP_ROUTE)}>Go to main page</button>
            </div>
          ) : (
            <>
              <div className={cls.catalogHeader}>
                <h1>{capitalizeFirstLetter(category?.name)}</h1>
                <div className={cls.breadcrumbs}>
                  <ul>
                    <li onClick={() => navigate(SHOP_ROUTE)}>Main</li>
                    <span aria-hidden="true">›</span>
                    <li>{capitalizeFirstLetter(category?.name)}</li>
                  </ul>
                </div>
              </div>
              <div className={cls.catalogContent}>
                <ProductList products={categoryProducts} />
              </div>
              <div ref={infiniteScrollRef} className="infiniteScroll">
                {isFetchingNextPage && <Loader />}
              </div>
            </>
          )
        )
      }
      {category?.id && allPagesLoaded && <RecommendedBlock />}
    </div>
  )
}

export default Catalog