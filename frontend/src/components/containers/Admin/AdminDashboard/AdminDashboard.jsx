// Styles
import cls from './AdminDashboard.module.scss';

// Hooks
import { useNavigate } from 'react-router-dom';
import { useGetAdminStatsQuery } from '@/hooks/query/useGetAdminQuery';
import { useGetUsersQuery } from '@/hooks/query/useUsersQuery';
import { useGetAllOrdersQuery } from '@/hooks/query/useOrdersQuery';

// Icons
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';
import { ReactComponent as ShopIcon } from '@/assets/icons/shop.svg';
import { ReactComponent as OrdersIcon } from '@/assets/icons/orders.svg';
import { ReactComponent as BoxIcon } from '@/assets/icons/box.svg';

// Utils
import { ADMIN_ROUTE } from '@/utils/constants/routes';
import { formatPrice } from '@/utils/currency';

// Components
import Loader from '@/components/ui/Loader/Loader';
import AdminUserRow from '@/components/elements/Admin/AdminUserRow/AdminUserRow';
import AdminOrderRow from '@/components/elements/Admin/AdminOrderRow/AdminOrderRow';
import Table from '@/components/ui/Table/Table';


function AdminDashboard() {
    const navigate = useNavigate()

    const { data: stats, isLoading: isLoadingStats } = useGetAdminStatsQuery()
    const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery()
    const { data: orderProducts, isLoading: isLoadingOrderProducts } = useGetAllOrdersQuery()

    if (isLoadingStats || isLoadingOrderProducts || isLoadingUsers || !stats) return <Loader />

    return (
        <div className={cls.AdminDashboard}>
            <div className={cls.statsGrid}>
                <div className={cls.statCard}>
                    <div className={cls.statIcon}>
                        <UserIcon />
                    </div>
                    <div className={cls.statInfo}>
                        <h3>{stats?.users || 0}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                
                <div className={cls.statCard}>
                    <div className={cls.statIcon}>
                        <BoxIcon />
                    </div>
                    <div className={cls.statInfo}>
                        <h3>{stats?.products || 0}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

                <div className={cls.statCard}>
                    <div className={cls.statIcon}>
                        <OrdersIcon />
                    </div>
                    <div className={cls.statInfo}>
                        <h3>{stats?.orders || 0}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className={cls.statCard}>
                    <div className={cls.statIcon}>
                        <ShopIcon />
                    </div>
                    <div className={cls.statInfo}>
                        <h3>{formatPrice(stats?.revenue || 0)}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
            </div>

            <section className={cls.section}>
                <div className={cls.sectionHeader}>
                    <h2>Recent Orders</h2>
                    <button 
                        className={cls.viewAllButton}
                        onClick={() => navigate(`${ADMIN_ROUTE}/orders`)}
                    >
                        View All
                    </button>
                </div>
                <div className={cls.tableContainer}>
                    <Table className={cls.table}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Customer</Table.Header>
                                <Table.Header>Product</Table.Header>
                                <Table.Header>Amount</Table.Header>
                                <Table.Header>Date</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {
                                orderProducts?.map(orderProduct => <AdminOrderRow key={orderProduct.id} orderProduct={orderProduct} />)
                            }
                        </Table.Body>
                    </Table>
                </div>
            </section>

            <section className={cls.section}>
                <div className={cls.sectionHeader}>
                    <h2>Recent Users</h2>
                    <button 
                        className={cls.viewAllButton}
                        onClick={() => navigate(`${ADMIN_ROUTE}/users`)}
                    >
                        View All
                    </button>
                </div>
                <div className={cls.tableContainer}>
                    <Table className={cls.table}>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Email</Table.Header>
                                <Table.Header>Name</Table.Header>
                                <Table.Header>Role</Table.Header>
                                <Table.Header>Created</Table.Header>
                                <Table.Header>Actions</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {users?.map(user => <AdminUserRow key={user.id} user={user} />)}
                        </Table.Body>
                    </Table>
                </div>
            </section>
        </div>
    )
}

export default AdminDashboard