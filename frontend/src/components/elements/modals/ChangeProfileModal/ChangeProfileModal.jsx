// React
import { useCallback, useEffect, useState } from 'react';

// Styles
import rootCls from '../ModalRoot/ModalRoot.module.scss';
import cls from './ChangeProfileModal.module.scss';

// Icons
import { ReactComponent as XIcon } from '@/assets/icons/x.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useErrorState } from '@/store/useErrorState';

// API
import { useAuthQuery, useChangeUserInfoQuery } from '@/hooks/query/useUsersQuery';
import Button from '@/components/ui/Button/Button';

function ChangeProfileModal() {
    const closeModal = useModalState(state => state.closeModal)
    // const { name, email } = useProfileState(state => state.user)

    const { data: user } = useAuthQuery()
    const { name, email } = user ?? {}

    const error = useErrorState(state => state.error)
    const setError = useErrorState(state => state.setError)

    const { mutate: changeUserInfo, isPending } = useChangeUserInfoQuery()

    const [nameValue, setNameValue] = useState(name ?? '')

    const saveProfileChanges = useCallback(async () => {
        if (nameValue.length >= 30) {
            setError('Too many symbols')
            return
        }

        try {
            changeUserInfo({ name: nameValue })
        } catch (e) {
            console.error('Failed to update profile:', e)
        }
    }, [changeUserInfo, nameValue, setError])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                saveProfileChanges()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [saveProfileChanges])

    return (
        <>
            <div className={rootCls.modalHeader}>
                <h2>Change profile</h2>
                <XIcon onClick={() => closeModal()}/>
            </div>
            <div className={rootCls.modalBody}>
                <div className={rootCls.modalSection}>
                    <h3>Name</h3>
                    <input 
                        type="text" 
                        value={nameValue} 
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </div>

                <div className={rootCls.modalSection}>
                    <h3>Email</h3>
                    <input 
                        type="text" 
                        value={email} 
                        readOnly
                        disabled
                    />
                </div>
            </div>
            {error && <span className={cls.errorText}>{error}</span>}
            <div className={rootCls.modalFooter}>
                <Button
                    className={cls.primaryAction}
                    onClick={saveProfileChanges}
                    disabled={isPending}
                    isLoading={isPending}
                >
                    Save
                </Button>
            </div>
        </>
    )
}

export default ChangeProfileModal