// React
import { useCallback, useEffect, useState } from 'react';

// Styles
import cls from '../../ModalRoot/ModalRoot.module.scss';
import styles from './CategoryFormModal.module.scss';

// Icons
import { ReactComponent as XIcon } from '@/assets/icons/x.svg';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useErrorState } from '@/store/useErrorState';

// API
import { useCreateCategoryQuery, useUpdateCategoryQuery } from '@/hooks/query/useCategoryQuery';

// Utils
import { getImageUrl } from '@/utils/image';
import Button from '@/components/ui/Button/Button';


function CategoryFormModal() {
    const closeModal = useModalState(state => state.closeModal)
    const { modalProps } = useModalState(); // {category}
    const editCategoryData = modalProps.category

    const { 
        mutate: createCategory, 
        isPending: isCreatePending 
      } = useCreateCategoryQuery();
      const { 
        mutate: updateCategory, 
        isPending: isUpdatePending 
      } = useUpdateCategoryQuery();
      
      const isPending = isUpdatePending || isCreatePending;

    const [nameInput, setNameInput] = useState('')
    const [iconInput, setIconInput] = useState(null)
    const [iconPreview, setIconPreview] = useState(null)
    const error = useErrorState(state => state.error)

    const handleSubmitCategory = useCallback(async () => {
        if (editCategoryData) {
            updateCategory({
                id: editCategoryData.id,
                name: nameInput,
                icon: iconInput,
            })
        } else {
            createCategory({ name: nameInput, icon: iconInput })
        }
    }, [createCategory, editCategoryData, iconInput, nameInput, updateCategory])

    const handlePreviewIcon = (e) => {
        const file = e.target.files[0]
        setIconInput(file)
        if (file) {
            setIconPreview(URL.createObjectURL(file))
        } else {
            setIconPreview(null)
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleSubmitCategory()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSubmitCategory])

    useEffect(() => {
        if (editCategoryData) {
            setNameInput(editCategoryData.name)
            setIconPreview(getImageUrl(editCategoryData.icon))
        } else {
            setNameInput('')
            setIconPreview(null)
        }
    }, [editCategoryData])

    const isEditMode = Boolean(editCategoryData)

    return (
        <>
            <div className={cls.modalHeader}>
                <h2>{isEditMode ? 'Update category' : 'Create category'}</h2>
                <XIcon onClick={() => closeModal()}/>
            </div>
            <div className={cls.modalBody}>
                <div className={cls.modalSection}>
                    <h3>Category name</h3>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                </div>
                <div className={cls.modalSection}>
                    <h3>Category icon</h3>
                    <label htmlFor="flieInput" className={styles.fileInputLabel}>
                        <input
                            id="flieInput"
                            type="file"
                            accept="image/*"
                            className={styles.fileInput}
                            onChange={(e) => handlePreviewIcon(e)}
                        />
                        {iconPreview ?
                            <img src={iconPreview} alt="icon preview" /> :
                            <span>Choose File</span>
                        }
                    </label>
                </div>
                {error && <span className='errorText'>{error}</span>}
                <div className={cls.modalFooter}>
                    <Button isLoading={isCreatePending} disabled={isPending} onClick={() => handleSubmitCategory()}>
                        {
                            isPending ? 
                            (isEditMode ? 'Updating...' : 'Creating...') : 
                            (isEditMode ? 'Update category' : 'Create category')
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CategoryFormModal