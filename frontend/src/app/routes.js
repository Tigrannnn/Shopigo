// Pages
import Admin from '@/pages/Admin/Admin';
import Catalog from '@/pages/Catalog/Catalog';
import Login from '@/pages/Login/Login';
import Basket from '@/pages/Basket/Basket';
import Favorites from '@/pages/Favorites/Favorites';
import PrivacyPolicy from '@/pages/Policy/PrivacyPolicy';
import ProductPage from '@/pages/ProductPage/ProductPage';
import Shop from '@/pages/Shop/Shop';
import TermsOfUse from '@/pages/Policy/TermsOfUse';
import Orders from '@/pages/Orders/Orders';
import Profile from '@/pages/Profile/Profile';
import Seller from '@/pages/Seller/Seller';
import NotFound from '@/pages/NotFound/NotFound';
import Search from '@/pages/Search/Search';

// Utils
import { 
    ADMIN_ROUTE, 
    BASKET_ROUTE, 
    FAVORITES_ROUTE, 
    LOGIN_ROUTE, 
    SHOP_ROUTE, 
    PRODUCT_ROUTE, 
    TERMS_OF_USE_ROUTE, 
    PRIVACY_POLICY_ROUTE, 
    ORDERS_ROUTE, 
    PROFILE_ROUTE, 
    SELLER_ROUTE, 
    CATEGORY_ROUTE, 
} from '@/utils/constants/routes';


export const routes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
    {
        path: PRODUCT_ROUTE + `/:id`,
        element: <ProductPage />
    },
    {
        path: FAVORITES_ROUTE,
        element: <Favorites />,
    },
    {
        path: TERMS_OF_USE_ROUTE,
        element: <TermsOfUse />,
    },
    {
        path: PRIVACY_POLICY_ROUTE,
        element: <PrivacyPolicy />,
    },
    {
        path: BASKET_ROUTE,
        element: <Basket />,
    },
    {
        path: ORDERS_ROUTE,
        element: <Orders />,
    },
    {
        path: PROFILE_ROUTE,
        element: <Profile />,
    },
    {
        path: SELLER_ROUTE + `/:id`,
        element: <Seller />,
    },
    {
        path: CATEGORY_ROUTE + `/:id`,
        element: <Catalog />,
    },
    {
        path: `${SHOP_ROUTE}/search`,
        element: <Search />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE + '/*',
        element: <Admin />,
    }
]