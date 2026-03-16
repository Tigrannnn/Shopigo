// Styles
import cls from './AdminSellers.module.scss';

// Hooks
import { useRef, useState, useMemo } from 'react';
import { searchItems } from '@/utils/searchItems';
import { useModalState } from '@/store/useModalState';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// Components
import Loader from '@/components/ui/Loader/Loader';
import AdminSellerRow from '@/components/elements/Admin/AdminSellerRow/AdminSellerRow';
import Table from '@/components/ui/Table/Table';
import { useGetSellers } from '@/hooks/query/useSellersQuery';

// Utils
import { MODALS } from '@/utils/constants/modals';


function AdminSellers () {
    // Modal
    const openModal = useModalState(state => state.openModal)

    // Search
    const [search, setSearch] = useState('')

    // Get queries
    const { data: sellers, isLoading } = useGetSellers()

    // Memoized filtered sellers using universal searchItems utility
    const filteredSellers = useMemo(() => searchItems(sellers, search, ['name']), [sellers, search]);

    // Infinite scroll
    const infiniteScroll = useRef()

    return (
        <div className={cls.AdminSellers}>
            <div className={cls.tabHeader}>
                <h2>Seller Management</h2>
                <button 
                    className={cls.addButton} 
                    onClick={() => openModal(MODALS.ADD_SELLER)}
                >
                    Create New Seller
                </button>
            </div>
            <div className={cls.searchBar}>
                <SearchIcon className={cls.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search sellers..." 
                    className={cls.searchInput} 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>
            <div className={cls.placeholderContent}>
                {!isLoading && filteredSellers.length <= 0 ? (
                    <>
                        <h3>Seller Management</h3>
                        <p>Organize products into sellers</p>
                        <p>No sellers found</p>
                    </>
                ) : (
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Seller name</Table.Header>
                                <Table.Header>Created</Table.Header>
                                <Table.Header>Actions</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {filteredSellers?.map(seller =>
                                <AdminSellerRow key={seller.id} seller={seller} />
                            )}
                        </Table.Body>
                    </Table>
                )}
                <div 
                    ref={infiniteScroll} 
                    className="infiniteScroll" 
                    // style={{backgroundColor: 'red', width: '100px', height: '100px'}}
                >
                    {isLoading && <Loader />}
                </div>
            </div>
        </div>
    )
}

export default AdminSellers