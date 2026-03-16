// React
import { useState } from 'react';

// Styles
import cls from '../../ModalRoot/ModalRoot.module.scss';
import styles from './SellerFormModal.module.scss';

// Icons
import { ReactComponent as XIcon } from '@/assets/icons/x.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useErrorState } from '@/store/useErrorState';

// API
import { 
    useCreateSellerQuery, 
    useUpdateSellerQuery 
} from '@/hooks/query/useSellersQuery';
import Button from '@/components/ui/Button/Button';


function SellerFormModal() {
    const closeModal = useModalState(state => state.closeModal)
    const { modalProps } = useModalState();
    const editSellerData = modalProps.seller;

    const { mutate: createSeller, isPending: isCreatePending } = useCreateSellerQuery()
    const { mutate: updateSeller, isPending: isUpdatePending } = useUpdateSellerQuery()

    const isPending = isCreatePending || isUpdatePending;
    const isEditMode = Boolean(editSellerData);

    const [nameInput, setNameInput] = useState(editSellerData?.name || '')

    const error = useErrorState(state => state.error)
    const setError = useErrorState(state => state.setError)

    const handleSubmitSeller = async () => {
        if (!nameInput) {
            setError('Seller name is required')
            return
        }
        if (isEditMode) {
            updateSeller({ id: editSellerData.id, name: nameInput })
        } else {
            createSeller({ name: nameInput })
        }
    }

    return (
        <>
            <div className={cls.modalHeader}>
                <h2>{isEditMode ? 'Update seller' : 'Create seller'}</h2>
                <XIcon onClick={() => closeModal()}/>
            </div>
            <div className={`${cls.modalBody} ${styles.sellerFormContent}`}>
                <div className={cls.modalSection}>
                    <h3>Seller name</h3>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                </div>
                {error && <span className='errorText'>{error}</span>}
                <div className={cls.modalFooter}>
                    <Button isLoading={isCreatePending} onClick={() => handleSubmitSeller()} disabled={isPending}>
                        {
                            isPending ? 
                            (isEditMode ? 'Updating...' : 'Creating...') : 
                            (isEditMode ? 'Update seller' : 'Create seller')
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SellerFormModal