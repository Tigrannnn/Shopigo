import { useProfileState } from '../store/useProfileState'
import cls from '../styles/CenterModal.module.scss'
import { ReactComponent as CreditCardIcon } from '../assets/icons/creditCard.svg';
import { ReactComponent as XIcon } from '../assets/icons/x.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useModalState } from '../store/useModalState';
import { useToastState } from '../store/useToastState';
import { createCategory } from '../http/categoryApi';

function CenterModal() {
    const centerModal = useModalState(state => state.centerModal)
    const closeCenterModal = useModalState(state => state.closeCenterModal)
    const shareUrl = useModalState(state => state.shareUrl)
    const openCenterModal = useModalState(state => state.openCenterModal)
    const logOut = useProfileState(state => state.logOut)
    const userName = useProfileState(state => state.name)
    const setUserName = useProfileState(state => state.setName)

    const [error, setError] = useState('')

    const [categoryNameInput, setCategoryNameInput] = useState('')
    

    const [nameValue, setNameValue] = useState(userName !== '' ? userName : '')

    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
        closeCenterModal()
        navigate('/')
        localStorage.removeItem('token')
    }

    const saveProfileChanges = () => { 
        setUserName(nameValue)
        closeCenterModal()
    }

    const addSmth = () => {
        if (centerModal === 'addCategory') {
            if (!categoryNameInput) {
                setError('Unvalid value')  
                setTimeout(() => {
                    setError('')
                }, 4000)
            } else {
                createCategory(categoryNameInput)
                closeCenterModal()
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeCenterModal()
            }
            
            if (e.key === 'Enter') {
                if (centerModal === 'changeProfile') {
                    saveProfileChanges()
                    closeCenterModal()
                }
                if (centerModal === 'addCategory') {
                    addSmth()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [centerModal, closeCenterModal, saveProfileChanges])

    const toast = useToastState(state => state.toast)

    const handleCopyProductLink = () => {
        navigator.clipboard?.writeText(shareUrl); 
        toast('Product link copied');
    }

    return(
        <div 
            className={`${cls.CenterModal} ${cls[centerModal]} ${centerModal === '' ? '' : cls.open} `} 
            onClick={(e) => e.stopPropagation()}
        >

            {
                centerModal === 'changeProfile' && (
                    <>
                        <div className={cls.header}>
                            <h2>Change profile</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.changeProfileContent}>
                            <h3>Name</h3>
                            <input 
                                type="text" 
                                value={nameValue} 
                                onChange={(e) => setNameValue(e.target.value)}
                            />
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
                        <button className={cls.addCardBtn} onClick={() => openCenterModal('addCard')}>
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

            {
                centerModal === 'share' && (
                    <>
                        <div className={cls.header}>
                            <h2>Share product</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.shareContent}>
                            <p>Copy link and share with friends</p>
                            <input type="text" value={shareUrl} readOnly />
                            <button 
                                onClick={() => handleCopyProductLink()}
                            >
                                Copy link
                            </button>
                        </div>
                    </>
                )
            }

            {
                centerModal === 'addProduct' && (
                    <>
                        <div className={cls.header}>
                            <h2>Add product</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.addContent}>
                            <div className={cls.addItem}>
                                <h3>Product name</h3>
                                <input type="text" />
                            </div>
                            <div className={cls.addProductItem}>
                                <h3>Product description</h3>
                                <input type="text" />
                            </div>
                            <div className={cls.addProductItem}>
                                <h3>Product price</h3>
                                <input type="number" />
                            </div>
                            <div className={cls.addProductItem}>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {
                centerModal === 'addCategory' && (
                    <>
                        <div className={cls.header}>
                            <h2>Add category</h2>
                            <XIcon onClick={() => closeCenterModal()}/>
                        </div>
                        <div className={cls.addContent}>
                            <div className={cls.addItem}>
                                <h3>Category name</h3>
                                <input 
                                    type="text" 
                                    value={categoryNameInput}
                                    onChange={(e) => setCategoryNameInput(e.target.value)}
                                />
                            </div>
                            {error && <span className={cls.errorText}>{error}</span>}
                            <div className={cls.addItem}>
                                <button onClick={() => addSmth()}>Add Category</button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CenterModal