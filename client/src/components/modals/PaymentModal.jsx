import cls from '../../styles/components/modals/CenterModal.module.scss'
import { useModalState } from '../../store/useModalState'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { ReactComponent as CreditCardIcon } from '../../assets/icons/creditCard.svg';

function PaymentModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)
    const openCenterModal = useModalState(state => state.openCenterModal)

    return (
        <>
            <div className={cls.header}>
                <h2>Payment methods</h2>
                <XIcon onClick={() => closeCenterModal()}/>
            </div>
            <button className={cls.addCardBtn}>
                <CreditCardIcon />
                <span>Add new card</span>
                <span>›</span>
            </button>
        </>
    )
}

export default PaymentModal