import { useCategoryState } from '../store/useCategoryState'
import cls from '../styles/pages/Filter.module.scss'

function Filter() {
  const openFilterModal = useCategoryState(state => state.openFilterModal)

    return(
        <div className={cls.Filter}>
            <div className={cls.filterItem} onClick={() => openFilterModal()}>
                <span>All filters</span>
            </div>
            <div className={cls.filterItem} onClick={() => console.log('hello')}>
                <span>Subcategory</span>
                <span>↓</span>
            </div>
            <div className={cls.filterItem} onClick={() => console.log('hello')}>
                <span>Price (dram)</span>
                <span>↓</span>
            </div>
            <div className={cls.filterItem} onClick={() => console.log('hello')}>
                <span>Delivery time</span>
                <span>↓</span>
            </div>
        </div>
    )
}

export default Filter