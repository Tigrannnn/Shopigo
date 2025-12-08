import cls from '../../styles/components/modals/CenterModal.module.scss'
import { useToastState } from '../../store/useToastState';
import { useModalState } from '../../store/useModalState';
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';

function ShareModal() {
    const shareUrl = useModalState(state => state.shareUrl)
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const toast = useToastState(state => state.toast)

    const handleCopyProductLink = () => {
        navigator.clipboard?.writeText(shareUrl); 
        toast('Product link copied');
    }

    return (
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

export default ShareModal