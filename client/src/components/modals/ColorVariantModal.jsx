import cls from '../../styles/components/modals/ColorVariantModal.module.scss';
import { useColorVariantState } from '../../store/useColorVariantState';   

function ColorVariantModal({product, color}) {
    const isColorVariantModalOpen = useColorVariantState(state => state.isColorVariantModalOpen)
    const modalPosition = useColorVariantState(state => state.modalPosition)
    
    return (
        <div 
            className={`${cls.colorVariantModal} ${isColorVariantModalOpen ? cls.open : ''}`}
            style={{
                left: `${modalPosition.left}px`,
            }}
        >
            <img src={color.image} alt="" />
            <div className={cls.colorVariantInfo}> 
                <h5>{product.price} dram</h5>
                <h5>{color.color}</h5>
            </div>
        </div>
    )
}

export default ColorVariantModal;