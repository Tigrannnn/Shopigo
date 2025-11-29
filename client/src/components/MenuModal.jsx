import { useMenuState } from '../store/useMenuState'
import cls from '../styles/MenuModal.module.scss'
import { CATEGORY_ROUTE } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import { useCategoryState } from '../store/useCategoryState'

function MenuModal({onClick}) {
    const isMenuModalOpen = useMenuState(state => state.isMenuModalOpen)
    const navigate = useNavigate()
    const categories = useCategoryState(state => state.categories)
    const setMenuModalClose = useMenuState(state => state.setMenuModalClose)
    
    
    return(
        <div className={`${cls.MenuModal} ${isMenuModalOpen ? cls.open : ''}`} onClick={onClick}>
            {
                categories?.map(category => (
                    <div 
                        className={cls.categoryWrapper} 
                        key={category.id} 
                        onClick={() => {
                            navigate(CATEGORY_ROUTE + `/${category.id}`)
                            setMenuModalClose()
                        }}
                    >
                        <div className={cls.categoryIcon}>
                            <img src={category.icon} alt="" />
                        </div>
                        <h4>{category.name}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default MenuModal