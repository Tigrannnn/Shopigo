import cls from '../../styles/components/modals/CenterModal.module.scss'
import { useNavigate } from 'react-router-dom'
import { useModalState } from '../../store/useModalState'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { useProfileState } from '../../store/useProfileState';


function LogOutModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)
    const logOut = useProfileState(state => state.logOut)

    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
        closeCenterModal()
        navigate('/')
        localStorage.removeItem('token')
    }

    return (
        <>
            <div className={cls.header}>
                <h2>Log Out</h2>
                <XIcon onClick={() => closeCenterModal()}/>
            </div>
            <div className={cls.logOutContent}>
                <p>Are you sure you want to log out?</p>
                <button 
                    className={cls.logOutButton} 
                    onClick={() => handleLogOut()}
                >
                    Yes, Log Out
                </button>
                <button 
                    className={cls.cancelButton} 
                    onClick={() => closeCenterModal()}
                >
                    No, Cancel
                </button>
            </div>
        </>
    )
}

export default LogOutModal