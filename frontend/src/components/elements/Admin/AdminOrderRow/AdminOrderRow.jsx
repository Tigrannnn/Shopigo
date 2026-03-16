import { formatPrice } from '@/utils/currency';
import Table from '@/components/ui/Table/Table';

function AdminOrderRow({ orderProduct }) {
    return (
        <Table.Row>
            <Table.Cell>{orderProduct.user?.email || 'N/A'}</Table.Cell>
            <Table.Cell>{orderProduct.product?.name || 'N/A'}</Table.Cell>
            <Table.Cell>{formatPrice(orderProduct.price)}</Table.Cell>
            <Table.Cell>{new Date(orderProduct.createdAt).toLocaleDateString()}</Table.Cell>
        </Table.Row>
    )
}

export default AdminOrderRow;