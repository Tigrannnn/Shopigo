// React and Router
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Styles
import cls from './Admin.module.scss';

// Utils
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { ADMIN_ROUTE } from '@/utils/constants/routes';

// Components
import AdminDashboard from '@/components/containers/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from '@/components/containers/Admin/AdminProducts/AdminProducts';
import AdminOrders from '@/components/containers/Admin/AdminOrders/AdminOrders';
import AdminSellers from '@/components/containers/Admin/AdminSellers/AdminSellers';
import AdminCategories from '@/components/containers/Admin/AdminCategories/AdminCategories';
import AdminUsers from '@/components/containers/Admin/AdminUsers/AdminUsers';


function Admin() {
    const navigate = useNavigate()
    const location = useLocation()
    let activeTab = location.pathname.split('/')[2] || 'dashboard'

    useEffect(() => {
        document.title = `Admin - ${capitalizeFirstLetter(activeTab)} - Shopigo`
    }, [activeTab])

    return(
        <div className={cls.Admin}>
            <div className={cls.adminContent}>
                <aside className={cls.sidebar}>
                    <nav className={cls.sidebarNav}>
                        <button
                            className={`${cls.navButton} ${activeTab === 'dashboard' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}`)}
                        >
                            <span>Dashboard</span>
                        </button>

                        <button
                            className={`${cls.navButton} ${activeTab === 'users' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}/users`)}
                        >
                            <span>Users</span>
                        </button>

                        <button
                            className={`${cls.navButton} ${activeTab === 'products' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}/products`)}
                        >
                            <span>Products</span>
                        </button>
                        <button
                            className={`${cls.navButton} ${activeTab === 'orders' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}/orders`)}
                        >
                            <span>Orders</span>
                        </button>

                        <button
                            className={`${cls.navButton} ${activeTab === 'categories' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}/categories`)}
                        >
                            <span>Categories</span>
                        </button>

                        <button
                            className={`${cls.navButton} ${activeTab === 'sellers' ? cls.active : ''}`}
                            onClick={() => navigate(`${ADMIN_ROUTE}/sellers`)}
                        >
                            <span>Sellers</span>
                        </button>
                    </nav>
                </aside>

                <main className={cls.mainContent}>
                    {activeTab === 'dashboard' && <AdminDashboard />}

                    {activeTab === 'users' && <AdminUsers />}

                    {activeTab === 'products' && <AdminProducts />}

                    {activeTab === 'orders' && <AdminOrders />}

                    {activeTab === 'categories' && <AdminCategories />}

                    {activeTab === 'sellers' && <AdminSellers />}
                </main>
            </div>
        </div>
    )
}

export default Admin