import Admin from "./pages/Admin"
import Catalog from "./pages/Catalog"
import Login from "./pages/Login"
import Basket from "./pages/Basket"
import Favorites from "./pages/Favorites"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ProductPage from "./pages/ProductPage"
import Shop from "./pages/Shop"
import TermsOfUse from "./pages/TermsOfUse"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import Seller from "./pages/Seller"
import Feedback from "./pages/Feedback"
import { ADMIN_ROUTE, BASKET_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, PRODUCT_ROUTE, TERMS_OF_USE_ROUTE, PRIVACY_POLICY_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, SELLER_ROUTE, CATALOG_ROUTE, QUESTION_ROUTE, REVIEW_ROUTE } from "./utils/consts"

export const routes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
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
        path: CATALOG_ROUTE + `/:id`,
        element: <Catalog />,
    },
    {
        path: `${PRODUCT_ROUTE}/:id${REVIEW_ROUTE}`,
        element: <Feedback />,
    },
    {
        path: `${PRODUCT_ROUTE}/:id${QUESTION_ROUTE}`,
        element: <Feedback />,
    }
]