// Styles
import cls from '../ModalRoot/ModalRoot.module.scss';

// Icons
import { ReactComponent as XIcon } from '@/assets/icons/x.svg';

// Hooks
import { useToastState } from '@/store/useToastState';
import { useModalState } from '@/store/useModalState';

function ShareModal() {
    // Modal
    const { modalProps } = useModalState();
    const closeModal = useModalState(state => state.closeModal)

    // Toast
    const toast = useToastState(state => state.toast)

    // Handle copy product link
    const handleCopyProductLink = () => {
        const shareUrl = modalProps.shareUrl;
        navigator.clipboard?.writeText(shareUrl); 
        toast('Product link copied');
    }

    return (
        <>
            <div className={cls.modalHeader}>
                <h2>Share product</h2>
                <XIcon onClick={() => closeModal()}/>
            </div>
            <div className={cls.shareContent}>
                <p>Copy link and share with friends</p>
                <input type="text" value={modalProps.shareUrl} readOnly />
                <button 
                    onClick={() => handleCopyProductLink()}
                >
                    Copy link
                </button>
            </div>
        </>
    )
}

export default ShareModal