// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './AdminSellerRow.module.scss';

// Icons
import { Edit, MoreVertical, Trash2 } from 'lucide-react';

// Hooks
import { useToastState } from '@/store/useToastState';

// Utils
import { SELLER_ROUTE } from '@/utils/constants/routes';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

// Components
import AdminDropdownMenu from '../AdminDropdownMenu/AdminDropdownMenu';
import Table from '@/components/ui/Table/Table';
import { useDeleteSellerQuery } from '@/hooks/query/useSellersQuery';
import { MODALS } from '@/utils/constants/modals';
import { useModalState } from '@/store/useModalState';


function AdminSellerRow({ seller }) {
    // Router
    const navigate = useNavigate();

    // Dropdown menu state
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Toast
    const toast = useToastState(state => state.toast)

    // Modal
    const openModal = useModalState(state => state.openModal)

    // Mutation queries
    const { mutate: deleteSeller } = useDeleteSellerQuery()

     const handleDeleteSeller = async () => {
        try {
            deleteSeller(seller.id)
            toast('Seller deleted successfully')
        } catch (e) {
            toast(e.response?.data?.message)
        }
    }

    const handleEditSeller = async () => {
        openModal(MODALS.ADD_SELLER, { seller })
        setIsMenuOpen(false)
    }

    const menuItems = [
        {
            label: 'Edit',
            icon: <Edit />,
            onClick: () => handleEditSeller()
        },
        {
            label: 'Delete',
            icon: <Trash2 />,
            isDelete: true,
            onClick: () => handleDeleteSeller()
        }
    ]

    return (
        <Table.Row>
            <Table.Cell>
                <Table.Link
                    onClick={() => navigate(`${SELLER_ROUTE}/${seller.id}`)}
                >
                    {capitalizeFirstLetter(seller.name)}
                </Table.Link>
            </Table.Cell>
            <Table.Cell>{new Date(seller.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
                <Table.Actions>
                    <button 
                        onClick={() => handleEditSeller()}
                        className={cls.actionButton}
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
                    {isMenuOpen && <AdminDropdownMenu items={menuItems} setIsMenuOpen={setIsMenuOpen}/>}
                </Table.Actions>
            </Table.Cell>
        </Table.Row>
    )
}

export default AdminSellerRow;