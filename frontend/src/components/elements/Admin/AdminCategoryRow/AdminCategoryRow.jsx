// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './AdminCategoryRow.module.scss';

// Icons
import { Edit, MoreVertical, Trash2 } from 'lucide-react';

// Hooks
import { useToastState } from '@/store/useToastState';
import { useModalState } from '@/store/useModalState';
import { useDeleteCategoryQuery } from '@/hooks/query/useCategoryQuery';

// Utils
import { CATEGORY_ROUTE } from '@/utils/constants/routes';
import { MODALS } from '@/utils/constants/modals';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { getImageUrl } from '@/utils/image';

// Components
import AdminDropdownMenu from '../AdminDropdownMenu/AdminDropdownMenu';
import Table from '@/components/ui/Table/Table';


function AdminCategoryRow({ category }) {
    const navigate = useNavigate();
    const toast = useToastState(state => state.toast)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openModal = useModalState(state => state.openModal)

    const { mutate: deleteCategory } = useDeleteCategoryQuery()

    const handleEditCategory = async () => {
        openModal(MODALS.ADD_CATEGORY, { category })
        setIsMenuOpen(false)
    }

    const handleDeleteCategory = async (categoryId) => {
        try {
            deleteCategory(categoryId)
            toast('Category deleted successfully')
            setIsMenuOpen(false)
        } catch (e) {
            toast(e.response?.data?.message)
        }
    }

    const menuItems = [
        {
            label: 'Edit',
            icon: <Edit size={16} />,
            onClick: () => handleEditCategory()
        },
        {
            label: 'Delete',
            icon: <Trash2 size={16} />,
            isDelete: true,
            onClick: () => handleDeleteCategory(category.id),
        }
    ]

    return (
        <Table.Row>
            <Table.Cell>
                <Table.Image
                    src={getImageUrl(category.icon)}
                    alt=""
                    onClick={() => navigate(`${CATEGORY_ROUTE}/${category.id}`)}
                />
            </Table.Cell>
            <Table.Cell>
                <Table.Link onClick={() => navigate(`${CATEGORY_ROUTE}/${category.id}`)}>
                    {capitalizeFirstLetter(category.name)}
                </Table.Link>
            </Table.Cell>
            <Table.Cell>{new Date(category.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
                <Table.Actions>
                    <button
                        className={cls.actionButton}
                        onClick={() => handleEditCategory()}
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        className={cls.actionButton}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-modal-trigger
                    >
                        <MoreVertical size={16} />
                    </button>
                    {isMenuOpen && <AdminDropdownMenu items={menuItems} setIsMenuOpen={setIsMenuOpen} />}
                </Table.Actions>
            </Table.Cell>
        </Table.Row>
    )
}

export default AdminCategoryRow;