import cls from "../styles/Admin.module.scss"
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg'
import { ReactComponent as OrdersIcon } from '../assets/icons/orders.svg'
import { ReactComponent as BasketIcon } from '../assets/icons/basket.svg'
import { ReactComponent as StarIcon } from '../assets/icons/star.svg'
import { ReactComponent as BoxIcon } from '../assets/icons/box.svg'
import { ReactComponent as HistoryIcon } from '../assets/icons/history.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg'
import { ReactComponent as CameraIcon } from '../assets/icons/camera.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { useState, useEffect } from 'react'
import { useModalState } from "../store/useModalState"

function Admin() {
    const [products, setProducts] = useState([])
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        document.title = 'Admin'
    }, [])
    const [activeTab, setActiveTab] = useState('dashboard')
    const openCenterModal = useModalState(state => state.openCenterModal)

    // Mock data for demonstration
    const stats = {
        users: 1247,
        products: 892,
        orders: 156,
        revenue: 2450000,
        reviews: 89,
        categories: 12
    }

    const recentOrders = [
        { id: 1, user: 'John Doe', product: 'iPhone 15 Pro', status: 'pending', amount: 450000, date: '2024-01-15' },
        { id: 2, user: 'Jane Smith', product: 'MacBook Air', status: 'processing', amount: 850000, date: '2024-01-14' },
        { id: 3, user: 'Bob Johnson', product: 'AirPods Pro', status: 'shipped', amount: 120000, date: '2024-01-13' },
        { id: 4, user: 'Alice Brown', product: 'iPad Air', status: 'delivered', amount: 320000, date: '2024-01-12' }
    ]

    const recentUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-10', orders: 3 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-01-09', orders: 1 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinDate: '2024-01-08', orders: 5 },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', joinDate: '2024-01-07', orders: 2 }
    ]

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return '#f39c12'
            case 'processing': return '#3498db'
            case 'shipped': return '#9b59b6'
            case 'delivered': return '#27ae60'
            case 'cancelled': return '#e74c3c'
            default: return '#95a5a6'
        }
    }

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Pending'
            case 'processing': return 'Processing'
            case 'shipped': return 'Shipped'
            case 'delivered': return 'Delivered'
            case 'cancelled': return 'Cancelled'
            default: return 'Unknown'
        }
    }

    return(
        <div className={cls.Admin}>
            <div className={cls.adminHeader}>
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Here's what's happening with your store today.</p>
            </div>

            <div className={cls.adminContent}>
                {/* Sidebar Navigation */}
                <aside className={cls.sidebar}>
                    <nav className={cls.sidebarNav}>
                        <button 
                            className={`${cls.navButton} ${activeTab === 'dashboard' ? cls.active : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            <ShopIcon className={cls.navIcon} />
                            <span>Dashboard</span>
                        </button>
                        
                        <button 
                            className={`${cls.navButton} ${activeTab === 'users' ? cls.active : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <UserIcon className={cls.navIcon} />
                            <span>Users</span>
                        </button>
                        
                        <button 
                            className={`${cls.navButton} ${activeTab === 'products' ? cls.active : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            <BoxIcon className={cls.navIcon} />
                            <span>Products</span>
                        </button>
                        
                        <button 
                            className={`${cls.navButton} ${activeTab === 'orders' ? cls.active : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <OrdersIcon className={cls.navIcon} />
                            <span>Orders</span>
                        </button>
                        
                        <button 
                            className={`${cls.navButton} ${activeTab === 'categories' ? cls.active : ''}`}
                            onClick={() => setActiveTab('categories')}
                        >
                            <BasketIcon className={cls.navIcon} />
                            <span>Categories</span>
                        </button>
                        
                        <button 
                            className={`${cls.navButton} ${activeTab === 'reviews' ? cls.active : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            <StarIcon className={cls.navIcon} />
                            <span>Reviews</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className={cls.mainContent}>
                    {activeTab === 'dashboard' && (
                        <div className={cls.dashboard}>
                            {/* Stats Cards */}
                            <div className={cls.statsGrid}>
                                <div className={cls.statCard}>
                                    <div className={cls.statIcon}>
                                        <UserIcon />
                                    </div>
                                    <div className={cls.statInfo}>
                                        <h3>{stats.users.toLocaleString()}</h3>
                                        <p>Total Users</p>
                                    </div>
                                </div>
                                
                                <div className={cls.statCard}>
                                    <div className={cls.statIcon}>
                                        <BoxIcon />
                                    </div>
                                    <div className={cls.statInfo}>
                                        <h3>{stats.products.toLocaleString()}</h3>
                                        <p>Total Products</p>
                                    </div>
                                </div>
                                
                                <div className={cls.statCard}>
                                    <div className={cls.statIcon}>
                                        <OrdersIcon />
                                    </div>
                                    <div className={cls.statInfo}>
                                        <h3>{stats.orders.toLocaleString()}</h3>
                                        <p>Total Orders</p>
                                    </div>
                                </div>
                                
                                <div className={cls.statCard}>
                                    <div className={cls.statIcon}>
                                        <ShopIcon />
                                    </div>
                                    <div className={cls.statInfo}>
                                        <h3>{stats.revenue.toLocaleString()} dram</h3>
                                        <p>Total Revenue</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className={cls.section}>
                                <div className={cls.sectionHeader}>
                                    <h2>Recent Orders</h2>
                                    <button className={cls.viewAllButton}>View All</button>
                                </div>
                                <div className={cls.tableContainer}>
                                    <table className={cls.table}>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Product</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map(order => (
                                                <tr key={order.id}>
                                                    <td>#{order.id}</td>
                                                    <td>{order.user}</td>
                                                    <td>{order.product}</td>
                                                    <td>
                                                        <span 
                                                            className={cls.statusBadge}
                                                            style={{backgroundColor: getStatusColor(order.status)}}
                                                        >
                                                            {getStatusText(order.status)}
                                                        </span>
                                                    </td>
                                                    <td>{order.amount.toLocaleString()} dram</td>
                                                    <td>{order.date}</td>
                                                    <td>
                                                        <div className={cls.actionButtons}>
                                                            <button className={cls.actionButton} title="View">
                                                                <SearchIcon />
                                                            </button>
                                                            <button className={cls.actionButton} title="Edit">
                                                                <CameraIcon />
                                                            </button>
                                                            <button className={cls.actionButton} title="Delete">
                                                                <TrashIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Users */}
                            <div className={cls.section}>
                                <div className={cls.sectionHeader}>
                                    <h2>Recent Users</h2>
                                    <button className={cls.viewAllButton}>View All</button>
                                </div>
                                <div className={cls.tableContainer}>
                                    <table className={cls.table}>
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Join Date</th>
                                                <th>Orders</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentUsers.map(user => (
                                                <tr key={user.id}>
                                                    <td>#{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.joinDate}</td>
                                                    <td>{user.orders}</td>
                                                    <td>
                                                        <div className={cls.actionButtons}>
                                                            <button className={cls.actionButton} title="View">
                                                                <SearchIcon />
                                                            </button>
                                                            <button className={cls.actionButton} title="Edit">
                                                                <CameraIcon />
                                                            </button>
                                                            <button className={cls.actionButton} title="Delete">
                                                                <TrashIcon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className={cls.usersTab}>
                            <div className={cls.tabHeader}>
                                <h2>User Management</h2>
                                <button className={cls.addButton}>Add New User</button>
                            </div>
                            <div className={cls.searchBar}>
                                <SearchIcon className={cls.searchIcon} />
                                <input type="text" placeholder="Search users..." className={cls.searchInput} />
                            </div>
                            <div className={cls.placeholderContent}>
                                <HistoryIcon className={cls.placeholderIcon} />
                                <h3>User Management</h3>
                                <p>Manage user accounts, permissions, and profiles</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className={cls.productsTab}>
                            <div className={cls.tabHeader}>
                                <h2>Product Management</h2>
                                <button 
                                    className={cls.addButton}
                                    onClick={() => openCenterModal('addProduct')}
                                >
                                    Add New Product
                                </button>
                            </div>
                            <div className={cls.searchBar}>
                                <SearchIcon className={cls.searchIcon} />
                                <input type="text" placeholder="Search products..." className={cls.searchInput} />
                            </div>
                            <div className={cls.placeholderContent}>
                                <BoxIcon className={cls.placeholderIcon} />
                                <h3>Product Management</h3>
                                <p>Add, edit, and manage product catalog</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className={cls.ordersTab}>
                            <div className={cls.tabHeader}>
                                <h2>Order Management</h2>
                                <button className={cls.addButton}>View All Orders</button>
                            </div>
                            <div className={cls.searchBar}>
                                <SearchIcon className={cls.searchIcon} />
                                <input type="text" placeholder="Search orders..." className={cls.searchInput} />
                            </div>
                            <div className={cls.placeholderContent}>
                                <OrdersIcon className={cls.placeholderIcon} />
                                <h3>Order Management</h3>
                                <p>Track and manage customer orders</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'categories' && (
                        <div className={cls.categoriesTab}>
                            <div className={cls.tabHeader}>
                                <h2>Category Management</h2>
                                <button className={cls.addButton}>Add New Category</button>
                            </div>
                            <div className={cls.searchBar}>
                                <SearchIcon className={cls.searchIcon} />
                                <input type="text" placeholder="Search categories..." className={cls.searchInput} />
                            </div>
                            <div className={cls.placeholderContent}>
                                <BasketIcon className={cls.placeholderIcon} />
                                <h3>Category Management</h3>
                                <p>Organize products into categories</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className={cls.reviewsTab}>
                            <div className={cls.tabHeader}>
                                <h2>Review Management</h2>
                                <button className={cls.addButton}>View All Reviews</button>
                            </div>
                            <div className={cls.searchBar}>
                                <SearchIcon className={cls.searchIcon} />
                                <input type="text" placeholder="Search reviews..." className={cls.searchInput} />
                            </div>
                            <div className={cls.placeholderContent}>
                                <StarIcon className={cls.placeholderIcon} />
                                <h3>Review Management</h3>
                                <p>Moderate and manage customer reviews</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Admin