import cls from '../../styles/components/modals/CenterModal.module.scss'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { useEffect, useState } from 'react';
import { useModalState } from '../../store/useModalState';
import { createProduct } from '../../http/productApi';
import { useSelectState } from '../../store/useSelectState';
import SelectModal from './SelectModal';
import { getCategories } from '../../http/categoryApi';
import { useCategoryState } from '../../store/useCategoryState';
import capitalizeFirstLetter from '../../utils/useCapitalizeFirsLetter';

function AddProductModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const openSelectModal = useSelectState(state => state.openSelectModal)
    const isSelectModalOpen = useSelectState(state => state.isSelectModalOpen)

    const [nameInput, setNameInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [priceInput, setPriceInput] = useState(0)
    const [imageInput, setImageInput] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    
    const categories = useCategoryState(state => state.categories)

    const [error, setError] = useState('')

     const addProduct = () => {
        if (!nameInput) {
            setError('Unvalid value')  
            setTimeout(() => {
                setError('')
            }, 4000)
        } else {
            createProduct(nameInput)
            closeCenterModal()
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                addProduct()
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
                <h2>Add product</h2>
                <XIcon onClick={() => closeCenterModal()}/>
            </div>
            <div className={cls.addContent}>
                <div className={cls.addItem}>
                    <div className={cls.selectWrapper}>
                        <button 
                            className={cls.selectButton}
                            onClick={(e) => (
                                e.stopPropagation(),
                                openSelectModal()
                            )}
                        >
                            <span>{capitalizeFirstLetter(productCategory?.name) ?? 'Select category'}</span>
                            <span>{}</span>
                        </button>
                        <button className={cls.selectButton}>
                            <span>Select seller</span>
                        </button>
                        {
                            isSelectModalOpen && 
                            <SelectModal 
                                items={categories} 
                                handleSelect={setProductCategory} 
                                selectedItem={productCategory}
                            />
                        }
                    </div>
                </div>
                <div className={cls.addItem}>
                    <h3>Product name</h3>
                    <input 
                        type="text"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                </div>
                <div className={cls.addItem}>
                    <h3>Product description</h3>
                    <input 
                        type="text" 
                        value={descriptionInput}
                        onChange={e => setDescriptionInput(e.target.value)}
                    />
                </div>
                <div className={cls.addItem}>
                    <h3>Product price</h3>
                    <input 
                        type="number" 
                        value={priceInput}
                        onChange={e => setPriceInput(Number(e.target.value))}
                    />
                </div>
                <div className={cls.addItem}>
                    <h3>Product image</h3>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setImageInput(e.target.files[0])}
                    />
                </div>
                {error && <span className={cls.errorText}>{error}</span>}
                <div className={cls.addItem}>
                    <button onClick={() => addProduct()}>Add Product</button>
                </div>
            </div>
        </>
    )
}

export default AddProductModal