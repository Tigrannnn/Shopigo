import { useMenuState } from '../store/useMenuState'
import cls from '../styles/MenuModal.module.scss'
import { CATALOG_ROUTE } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import { useCatalogState } from '../store/useCatalogState'

function MenuModal({onClick}) {
    const isMenuModalOpen = useMenuState(state => state.isMenuModalOpen)
    const navigate = useNavigate()
    const catalog = useCatalogState(state => state.catalog)
    const setMenuModalClose = useMenuState(state => state.setMenuModalClose)
    
    
    return(
        <div className={`${cls.MenuModal} ${isMenuModalOpen ? cls.open : ''}`} onClick={onClick}>
            {
                catalog.map(category => (
                    <div 
                        className={cls.categoryWrapper} 
                        key={category.id} 
                        onClick={() => {
                            navigate(CATALOG_ROUTE + `/${category.id}`)
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