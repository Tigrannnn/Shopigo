import cls from '../../styles/components/modals/CenterModal.module.scss'
import { useModalState } from '../../store/useModalState'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { useEffect, useState } from 'react';
import { createCategory } from '../../http/categoryApi';

function AddCategoryModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const [nameInput, setNameInput] = useState('')
    const [iconInput, setIconInput] = useState(null)
    const [error, setError] = useState('')

    const addCategory = () => {
        if (!nameInput) {
            setError('Unvalid value')  
            setTimeout(() => {
                setError('')
            }, 4000)
        } else {
            createCategory(nameInput, iconInput)
            closeCenterModal()
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                addCategory()
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
                <h2>Add category</h2>
                <XIcon onClick={() => closeCenterModal()}/>
            </div>
            <div className={cls.addContent}>
                <div className={cls.addItem}>
                    <h3>Category name</h3>
                    <input 
                        type="text" 
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                </div>
                <div className={cls.addItem}>
                    <h3>Category icon</h3>
                    <input type="file" accept="image/*" onChange={(e) => setIconInput(e.target.files[0])} />
                </div>
                {error && <span className={cls.errorText}>{error}</span>}
                <div className={cls.addItem}>
                    <button onClick={() => addCategory()}>Add Category</button>
                </div>
            </div>
        </>
    )
}

export default AddCategoryModal