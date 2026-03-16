// Styles
import cls from './AdminUsers.module.scss';

// Hooks
import { useState, useEffect } from 'react';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// API
import { getUsers } from '@/http/userApi';

// Components
import Loader from '@/components/ui/Loader/Loader';
import AdminUserRow from '@/components/elements/Admin/AdminUserRow/AdminUserRow';
import Table from '@/components/ui/Table/Table';


function AdminUsers() {
    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState([])

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 200)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        getUsers({search: debouncedSearch, limit: 10}).then(data => 
            setUsers(data)
        ).finally(() => setLoading(false))
    }, [debouncedSearch, setUsers])

    return(
        <div className={cls.AdminUsers}>
            <div className={cls.searchBar}>
                <SearchIcon className={cls.searchIcon} />
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className={cls.searchInput} 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={cls.placeholderContent}>
                {loading ? <Loader /> : 
                    users.length <= 0 ? (
                    <>
                        <h3>User Management</h3>
                        <p>No users found</p>
                    </>
                ) : (
                    <Table>
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
                )}
            </div>
        </div>
    )
}

export default AdminUsers