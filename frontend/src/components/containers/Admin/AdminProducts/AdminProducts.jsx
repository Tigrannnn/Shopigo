// Styles
import cls from './AdminProducts.module.scss';

// Hooks
import { useState, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useModalState } from '@/store/useModalState';
import { useObserver } from '@/hooks/useObserver';
import { useGetProductsQuery } from '@/hooks/query/useProductQuery';
import { useResponsiveProductLimit } from '@/hooks/useResponsiveProductLimit';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// Components
import Loader from '@/components/ui/Loader/Loader';
import AdminProductRow from '@/components/elements/Admin/AdminProductRow/AdminProductRow';
import Table from '@/components/ui/Table/Table';

// Utils
import { MODALS } from '@/utils/constants/modals';
import { Button } from 'react-bootstrap';


function AdminProducts() {
    // Modal
    const openModal = useModalState(state => state.openModal)

    // Search
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 200);


    const limit = useResponsiveProductLimit({ rows: 3 });

    // Get queries
    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useGetProductsQuery({ search: debouncedSearch, limit, order: 'createdAt,DESC' })
    const products = data ? data.pages.flatMap((p) => p.products ?? p) : []


    // Infinite scroll
    const infiniteScroll = useRef()

    useObserver(infiniteScroll, () => {
        fetchNextPage()
    }, isFetchingNextPage, hasNextPage)

    return (
        <div className={cls.AdminProducts}>
            <div className={cls.tabHeader}>
                <h2>Product Management</h2>
                <Button 
                    className={cls.addButton}
                    onClick={() => openModal(MODALS.ADD_PRODUCT, { product: null })}
                >
                    Create New Product
                </Button>
            </div>
            <div className={cls.searchBar}>
                <SearchIcon className={cls.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className={cls.searchInput} 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={cls.placeholderContent}>
                {
                    !isLoading && products?.length <= 0 ? (
                    <>
                        <h3>Product Management</h3>
                        <p>No products found</p>
                    </>
                ) : (
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Product</Table.Header>
                                <Table.Header>Category</Table.Header>
                                <Table.Header>Seller</Table.Header>
                                <Table.Header>Price</Table.Header>
                                <Table.Header>Created</Table.Header>
                                <Table.Header>Actions</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {
                                products?.map(product =>
                                    <AdminProductRow key={product.id} product={product} />
                                )
                            }
                        </Table.Body>
                    </Table>
                )}
                <div 
                    ref={infiniteScroll} 
                    className="infiniteScroll" 
                >
                    {(isFetchingNextPage || isLoading) && <Loader />}
                </div>
            </div>
        </div>
    )
}

export default AdminProducts