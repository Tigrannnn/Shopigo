import cls from '../../styles/components/modals/CenterModal.module.scss'
import { ReactComponent as XIcon } from '../../assets/icons/x.svg';
import { useEffect, useState } from 'react';
import { useModalState } from '../../store/useModalState';
import { createProduct } from '../../http/productApi';
import SelectModal from './SelectModal';
import { getCategories } from '../../http/categoryApi';
import { useCategoryState } from '../../store/useCategoryState';
import { getSellers } from '../../http/sellerApi';
import capitalizeFirstLetter from '../../utils/useCapitalizeFirsLetter';
import { useToastState } from '../../store/useToastState';

function AddProductModal() {
    const closeCenterModal = useModalState(state => state.closeCenterModal)

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [isSellerModalOpen, setIsSellerModalOpen] = useState(false)

    const [nameInput, setNameInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [priceInput, setPriceInput] = useState(0)
    const [imageInput, setImageInput] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    const [productSeller, setProductSeller] = useState(null)

    const [sellers, setSellers] = useState([])
    
    const categories = useCategoryState(state => state.categories)

    const [error, setError] = useState('')

    const toast = useToastState(state => state.toast)

    useEffect(() => {
        getSellers().then(data => {
            setSellers(data)
        })
    }, [])

     const addProduct = async () => {
        if (!nameInput || !descriptionInput || !priceInput || !imageInput || !productCategory || !productSeller) {
            setError('Unvalid value')  
            setTimeout(() => {
                setError('')
            }, 4000)
        } else {
            try {
                await createProduct({
                    name: nameInput,
                    price: priceInput,
                    description: descriptionInput,
                    rating: 0,
                    categoryId: productCategory.id,
                    sellerId: productSeller.id,
                    image: imageInput
                })
                toast('Product added successfully')
                closeCenterModal()
            } catch (e) {
                setError(e.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
            }
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
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsCategoryModalOpen(!isCategoryModalOpen)
                                setIsSellerModalOpen(false)
                            }}
                        >
                            <span><img width='25px' src={(process.env.REACT_APP_API_URL + productCategory?.icon) ?? ``} alt="" /></span>
                            <span>{capitalizeFirstLetter(productCategory?.name) ?? 'Select category'}</span>
                            <span>{isCategoryModalOpen ? '↓' : '↑'}</span>
                        </button>
                        <button 
                            className={cls.selectButton}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsSellerModalOpen(!isSellerModalOpen)
                                setIsCategoryModalOpen(false)
                            }}
                        >
                            <span>{capitalizeFirstLetter(productSeller?.name) ?? 'Select seller'}</span>
                            <span>{isSellerModalOpen ? '↓' : '↑'}</span>
                        </button>
                        {
                            isCategoryModalOpen && 
                            <SelectModal 
                                items={categories} 
                                handleSelect={(item) => {
                                    setProductCategory(item)
                                    setIsCategoryModalOpen(false)
                                }} 
                                selectedItem={productCategory}
                                top={135}
                            />
                        }
                        {
                            isSellerModalOpen && 
                            <SelectModal 
                                items={sellers} 
                                handleSelect={(item) => {
                                    setProductSeller(item)
                                    setIsSellerModalOpen(false)
                                }} 
                                selectedItem={productSeller}
                                top={135}
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