import cls from '../../styles/components/modals/CenterModal.module.scss'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg'
import { useModalState } from '../../store/useModalState'

function WriteSupportModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    return(
        <>
            <div className={cls.header}>
                <h2>Write to support</h2>
                <XIcon onClick={() => closeCenterModal()}/>
            </div>
            <div className={cls.WriteReviewContent}>

            </div>
        </>
    )
}

export default WriteSupportModal