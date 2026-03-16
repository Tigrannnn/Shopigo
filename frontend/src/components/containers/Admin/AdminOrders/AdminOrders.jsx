// Styles
import cls from './AdminOrders.module.scss';

// Hooks
import { useState, useMemo } from 'react';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// Components
import AdminOrderRow from '@/components/elements/Admin/AdminOrderRow/AdminOrderRow';
import { useGetAllOrdersQuery } from '@/hooks/query/useOrdersQuery';
import Loader from '@/components/ui/Loader/Loader';
import { searchItems } from '@/utils/searchItems';
import Table from '@/components/ui/Table/Table';


function AdminOrders() {
    const [search, setSearch] = useState('')

    const { data: orderProducts, isLoading } = useGetAllOrdersQuery()

    const filteredOrders = useMemo(() => searchItems(orderProducts, search, ['product.name']), [orderProducts, search])

    return (
        <div className={cls.AdminOrders}>
            <div className={cls.tabHeader}>
                <h2>Product Management</h2>
            </div>
            <div className={cls.searchBar}>
                <SearchIcon className={cls.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className={cls.searchInput} 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={cls.placeholderContent}>
                {
                    isLoading ? (
                        <Loader />
                     ) : filteredOrders?.length <= 0 ? (
                        <>
                            <h3>Seller Management</h3>
                            <p>Organize products into sellers</p>
                            <p>No sellers found</p>
                        </>
                    ) : (
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>User email</Table.Header>
                                    <Table.Header>Product name</Table.Header>
                                    <Table.Header>Price</Table.Header>
                                    <Table.Header>Created</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {filteredOrders?.map((orderProduct) =>
                                    <AdminOrderRow key={orderProduct.id} orderProduct={orderProduct} />
                                )}
                            </Table.Body>
                        </Table>
                    )
                }
            </div>
        </div>
    )
}

export default AdminOrders