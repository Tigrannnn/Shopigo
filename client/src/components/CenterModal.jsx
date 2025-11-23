import { useProfileState } from '../store/useProfileState'
import cls from '../styles/CenterModal.module.scss'
import { ReactComponent as CreditCardIcon } from '../assets/icons/creditCard.svg';
import { ReactComponent as XIcon } from '../assets/icons/x.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

function CenterModal() {
    const centerModal = useProfileState(state => state.centerModal)
    const closeCenterModal = useProfileState(state => state.closeCenterModal)
    const shareUrl = useProfileState(state => state.shareUrl)
    const openCenterModal = useProfileState(state => state.openCenterModal)
    const setUser = useProfileState(state => state.setUser)
    const userName = useProfileState(state => state.name)
    const setUserName = useProfileState(state => state.setName)
    

    const [nameValue, setNameValue] = useState(userName !== '' ? userName : '')

    const navigate = useNavigate()

    const handleLogOut = () => {
        setUser('guest')
        closeCenterModal()
        navigate('/')
    }

    const saveProfileChanges = useCallback(() => { 
        setUserName(nameValue)
        closeCenterModal()
    }, [nameValue, setUserName, closeCenterModal])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (centerModal !== '') {
                if (e.key === 'Enter') {
                    saveProfileChanges()
                    closeCenterModal()
                } else if (e.key === 'Escape') {
                    closeCenterModal()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [centerModal, closeCenterModal, saveProfileChanges])

    return(
        <div 
            className={`${cls.CenterModal} ${centerModal === '' ? '' : cls.open}`} 
            onClick={(e) => e.stopPropagation()}
        >

            {/* profile */}
            {
                centerModal === 'changeProfile' && (
                    <>
                        <div className={cls.header}>
                            <h2>Change profile</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.changeProfileItem}>
                            <div>
                                <h3>Name</h3>
                                <input type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)}/>
                            </div>
                        </div>
                        <button className={cls.save} onClick={saveProfileChanges}>
                            <p>Save</p>
                        </button>
                    </>
                )
            }
            {
                centerModal === 'payment' && (
                    <>
                        <div className={cls.header}>
                            <h2>Payment methods</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <button className={cls.addCard} onClick={() => openCenterModal('addCard')}>
                            <CreditCardIcon />
                            <span>Add new card</span>
                            <span>›</span>
                        </button>
                    </>
                )
            }
            {
                centerModal === 'addCard' && (
                    <>
                        <div className={cls.header}>
                            <h2>Add new card</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                    </>
                )
            }
            {
                centerModal === 'logout' && (
                    <>
                        <div className={cls.header}>
                            <h2>Log Out</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.logoutContent}>
                            <p>Are you sure you want to log out?</p>
                            <button 
                                className={cls.logoutButton} 
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

            {/* share */}
            {
                centerModal === 'share' && (
                    <>
                        <div className={cls.header}>
                            <h2>Share product</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.logoutContent}>
                            <p>Copy link and share with friends</p>
                            <input type="text" value={shareUrl} readOnly />
                            <button 
                                className={cls.logoutButton}
                                onClick={() => { navigator.clipboard?.writeText(shareUrl); closeCenterModal(); }}
                            >
                                Copy link
                            </button>
                        </div>
                    </>
                )
            }

            {/* admin */}
            {
                centerModal === 'addProduct' && (
                    <>
                        <div className={cls.header}>
                            <h2>Add product</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.addProductContent}>
                            <div className={cls.addProductItem}>
                                <h3>Product name</h3>
                                <input type="text" />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CenterModal