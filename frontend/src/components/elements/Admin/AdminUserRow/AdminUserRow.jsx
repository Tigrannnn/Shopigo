// React
import { useState } from 'react';

// Styles
import cls from './AdminUserRow.module.scss';

// Icons
import { MoreVertical } from 'lucide-react';
import { ReactComponent as UserIcon } from '@/assets/icons/user.svg';

// Hooks
import { useChangeUserRoleQuery } from '@/hooks/query/useUsersQuery';

// Components
import AdminDropdownMenu from '../AdminDropdownMenu/AdminDropdownMenu';
import Table from '@/components/ui/Table/Table';


function AdminUserRow({ user }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { mutate: changeUserRole, isPending: isChangeUserRolePending } = useChangeUserRoleQuery({
        onSettled: () => {
            setIsMenuOpen(false)
        }
    })

    const handleChangeUser = () => {
        changeUserRole(user.id)
    }

    const isAdmin = user.role === 'ADMIN'
    const targetRole = isAdmin ? 'user' : 'admin'

    const menuItems = [
        {
            label: isChangeUserRolePending ? `Making ${targetRole}` : `Make ${targetRole}`,
            onClick: () => handleChangeUser(),
            isLoading: isChangeUserRolePending,
            icon: <UserIcon />
        },
    ]

    return (
        <Table.Row>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.name ?? 'Shopigo User'}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
                <Table.Actions>
                    <button
                        className={cls.actionButton}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-modal-trigger
                    >
                        <MoreVertical size={16}/>
                    </button>
                    {isMenuOpen && <AdminDropdownMenu items={menuItems} setIsMenuOpen={setIsMenuOpen}/>}
                </Table.Actions>
            </Table.Cell>
        </Table.Row>
    )
}

export default AdminUserRow;