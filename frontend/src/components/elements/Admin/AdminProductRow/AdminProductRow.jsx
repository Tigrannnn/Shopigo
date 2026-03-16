// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './AdminProductRow.module.scss';

// Icons
import { Edit, MoreVertical, Trash2 } from 'lucide-react';

// Hooks
import { useToastState } from '@/store/useToastState';
import { useModalState } from '@/store/useModalState';
import { useDeleteProductQuery } from '@/hooks/query/useProductQuery';

// Utils
import { CATEGORY_ROUTE, SELLER_ROUTE, PRODUCT_ROUTE } from '@/utils/constants/routes';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { formatPrice } from '@/utils/currency';
import { getImageUrl } from '@/utils/image';
import { MODALS } from '@/utils/constants/modals';

// Components
import AdminDropdownMenu from '../AdminDropdownMenu/AdminDropdownMenu';
import Table from '@/components/ui/Table/Table';
import Button from '@/components/ui/Button/Button';

function AdminProductRow({ product }) {
    const navigate = useNavigate();
    const toast = useToastState(state => state.toast)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = useModalState(state => state.openModal)

    const { mutate: deleteProduct, isPending: isDeletePending } = useDeleteProductQuery({
        onSettled: () => {
            setIsMenuOpen(false);
        }
    })

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id)
        } catch (e) {
            toast(e.response?.data?.message)
        }
    }

    const handleEditProduct = async () => {
        openModal(MODALS.ADD_PRODUCT, { product })
        setIsMenuOpen(false)
    }

    const menuItems = [
        {
            label: 'Edit',
            icon: <Edit size={16} />,
            onClick: () => handleEditProduct()
        },
        {
            label: isDeletePending ? 'Deleting...' : 'Delete',
            icon: <Trash2 size={16} />,
            isDelete: true,
            onClick: () => handleDeleteProduct(),
            isLoading: isDeletePending
        }
    ]

    return (
        <Table.Row>
            <Table.Cell className={cls.productCell}>
                <Table.Image
                    src={getImageUrl(product.image)}
                    alt={product?.name ? `Product image: ${product.name}` : 'Product image'}
                    onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}
                />
                <Table.Link onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
                    {capitalizeFirstLetter(product.name)}
                </Table.Link>
            </Table.Cell>
            <Table.Cell>
                <Table.Link onClick={() => navigate(`${CATEGORY_ROUTE}/${product.category?.id}`)}>
                    {capitalizeFirstLetter(product.category?.name)}
                </Table.Link>
            </Table.Cell>
            <Table.Cell>
                <Table.Link onClick={() => navigate(`${SELLER_ROUTE}/${product.seller?.id}`)}>
                    {capitalizeFirstLetter(product.seller?.name)}
                </Table.Link>
            </Table.Cell>
            <Table.Cell>{formatPrice(product.price)}</Table.Cell>
            <Table.Cell>{new Date(product.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
                <Table.Actions>
                    <Button
                        className={cls.actionButton}
                        variant="action"
                        onClick={() => handleEditProduct()}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        className={cls.actionButton}
                        variant="action"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-modal-trigger
                    >
                        <MoreVertical size={16} />
                    </Button>
                    {isMenuOpen && <AdminDropdownMenu items={menuItems} setIsMenuOpen={setIsMenuOpen}/>}
                </Table.Actions>
            </Table.Cell>
        </Table.Row>
    )
}

export default AdminProductRow;