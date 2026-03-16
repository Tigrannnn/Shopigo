// Styles
import cls from './AdminCategories.module.scss';

// Hooks
import { useState, useMemo } from 'react';
import { searchItems } from '@/utils/searchItems';
import { useModalState } from '@/store/useModalState';
import { useGetCategoryQuery } from '@/hooks/query/useCategoryQuery';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// Components
import AdminCategoryRow from '@/components/elements/Admin/AdminCategoryRow/AdminCategoryRow';
import Loader from '@/components/ui/Loader/Loader';
import Button from '@/components/ui/Button/Button';
import Table from '@/components/ui/Table/Table';

// Utils
import { MODALS } from '@/utils/constants/modals';


function AdminCategories() {
    // Modal
    const openModal = useModalState(state => state.openModal)

    // Search
    const [search, setSearch] = useState('')

    // Get queries
    const { data: categories, isLoading } = useGetCategoryQuery()

    // Memoized filtered categories using universal searchItems utility
    const filteredCategories = useMemo(() => searchItems(categories, search, ['name']), [categories, search]);

    return (
        <div className={cls.AdminCategories}>
            <div className={cls.tabHeader}>
                <h2>Category Management</h2>
                <Button 
                    className={cls.addButton} 
                    onClick={() => openModal(MODALS.ADD_CATEGORY, { category: null })}
                >
                    Create New Category
                </Button>
            </div>
            <div className={cls.searchBar}>
                <SearchIcon className={cls.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search categories..." 
                    className={cls.searchInput} 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>
            <div className={cls.placeholderContent}>
                {isLoading ? (
                    <Loader />
                ) : filteredCategories?.length <= 0 ? (
                    <>
                        <h3>Category Management</h3>
                        <p>Organize products into categories</p>
                        <p>No categories found</p>
                    </>
                ) : (
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Category icon</Table.Header>
                                <Table.Header>Category name</Table.Header>
                                <Table.Header>Created</Table.Header>
                                <Table.Header>Actions</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {filteredCategories?.map(category =>
                                <AdminCategoryRow key={category.id} category={category} />
                            )}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default AdminCategories