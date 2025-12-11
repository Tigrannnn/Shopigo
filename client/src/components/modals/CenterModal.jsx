import cls from '../../styles/components/modals/CenterModal.module.scss'
import { useEffect } from 'react';
import { useModalState } from '../../store/useModalState';
import ChangeProfileModal from './ChangeProfileModal';
import PaymentModal from './PaymentModal';
import LogOutModal from './LogOutModal';
import ShareModal from './ShareModal';
import AddCategoryModal from './AddCategoryModal';
import AddProductModal from './AddProductModal';
import WriteReviewModal from './WriteReviewModal';
import WriteSupportModal from './WriteSupportModal';
import { useSelectState } from '../../store/useSelectState';

function CenterModal() {
    const centerModal = useModalState(state => state.centerModal)
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const closeSelectModal = useSelectState(state => state.closeSelectModal)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeCenterModal()
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
            onClick={(e) => (
                e.stopPropagation(),
                closeSelectModal()
            )}
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
                centerModal === 'logOut' && (
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
                    <AddProductModal />
                )
            }

            {
                centerModal === 'addCategory' && (
                    <AddCategoryModal />
                )
            }

            {
                centerModal === 'writeReview' && (
                    <WriteReviewModal />
                )
            }
            
            {
                centerModal === 'writeSupport' && (
                    <WriteSupportModal />
                )
            }
        </div>
    )
}

export default CenterModal