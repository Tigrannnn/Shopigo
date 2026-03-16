// Styles
import cls from '../ModalRoot/ModalRoot.module.scss';

// Icons
import { ReactComponent as XIcon } from '@/assets/icons/x.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useLogoutQuery } from '@/hooks/query/useUsersQuery';


function LogoutModal() {
    const closeModal = useModalState(state => state.closeModal)
    const { mutate: logout } = useLogoutQuery()

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className={cls.modalHeader}>
                <h2>Log Out</h2>
                <XIcon onClick={() => closeModal()}/>
            </div>
            <div className={cls.logoutContent}>
                <p>Are you sure you want to log out?</p>
                <button
                    className={cls.logoutButton}
                    onClick={() => handleLogout()}
                >
                    Yes, Log Out
                </button>
                <button
                    className={cls.cancelButton}
                    onClick={() => closeModal()}
                >
                    No, Cancel
                </button>
            </div>
        </>
    )
}

export default LogoutModal