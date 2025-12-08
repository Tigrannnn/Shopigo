import cls from '../../styles/components/modals/CenterModal.module.scss'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg'
import { useModalState } from '../../store/useModalState'
import { useEffect, useState } from 'react'
import { useProfileState } from '../../store/useProfileState'

function ChangeProfileModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const userName = useProfileState(state => state.name)
    const setUserName = useProfileState(state => state.setName)

    const [nameValue, setNameValue] = useState(userName !== '' ? userName : '')

    const saveProfileChanges = () => { 
        setUserName(nameValue)
        closeCenterModal()
    }

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
    }, [])

    return (
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

export default ChangeProfileModal