import { useProfileState } from '../../store/useProfileState'
import cls from '../../styles/components/modals/CenterModal.module.scss'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useModalState } from '../../store/useModalState';
import { useToastState } from '../../store/useToastState';
import { createCategory } from '../../http/categoryApi';
import ChangeProfileModal from './ChangeProfileModal';
import PaymentModal from './PaymentModal';
import LogOutModal from './LogOutModal';
import ShareModal from './ShareModal';
import AddCategoryModal from './AddCategoryModal';

function CenterModal() {
    const centerModal = useModalState(state => state.centerModal)
    const closeCenterModal = useModalState(state => state.closeCenterModal)
    const shareUrl = useModalState(state => state.shareUrl)
    const openCenterModal = useModalState(state => state.openCenterModal)
    const userName = useProfileState(state => state.name)
    const setUserName = useProfileState(state => state.setName)

    const [error, setError] = useState('')

    const [categoryNameInput, setCategoryNameInput] = useState('')
    

    const [nameValue, setNameValue] = useState(userName !== '' ? userName : '')

    const addCategory = () => {
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

    const addProduct = () => {
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeCenterModal()
            }
            
            if (e.key === 'Enter') {
                if (centerModal === 'addProduct') {
                    addProduct()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [centerModal, closeCenterModal])

    return(
        <div 
            className={`${cls.CenterModal} ${cls[centerModal]} ${centerModal === '' ? '' : cls.open} `} 
            onClick={(e) => e.stopPropagation()}
        >

            {
                centerModal === 'changeProfile' && (
                    <ChangeProfileModal />
                )
            }

            {
                centerModal === 'payment' && (
                    <PaymentModal />
                )
            }

            {
                centerModal === 'logout' && (
                    <LogOutModal />
                )
            }

            {
                centerModal === 'share' && (
                    <ShareModal />
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
                            <div className={cls.addItem}>
                                <h3>Product description</h3>
                                <input type="text" />
                            </div>
                            <div className={cls.addItem}>
                                <h3>Product price</h3>
                                <input type="number" />
                            </div>
                            <div className={cls.addItem}>
                                <h3>Product image</h3>
                                <input type="file" accept="image/*" />
                            </div>
                            <div className={cls.addItem}>
                                <div className={cls.selectWrapper}>
                                    <button className={cls.selectButton}>
                                        <span>hi</span>
                                    </button>
                                    <button className={cls.selectButton}>
                                        <span>hi</span>
                                    </button>
                                </div>
                            </div>
                            {error && <span className={cls.errorText}>{error}</span>}
                            <div className={cls.addItem}>
                                <button onClick={() => addProduct()}>Add Product</button>
                            </div>
                        </div>
                    </>
                )
            }

            {
                centerModal === 'addCategory' && (
                    <AddCategoryModal />
                )
            }
        </div>
    )
}

export default CenterModal