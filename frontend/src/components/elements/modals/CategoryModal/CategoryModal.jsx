// React
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './CategoryModal.module.scss';

// Hooks
import { useModalState } from '@/store/useModalState';
import { useGetCategoryQuery } from '@/hooks/query/useCategoryQuery';

// Utils
import { CATEGORY_ROUTE } from '@/utils/constants/routes';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { getImageUrl } from '@/utils/image';


function CategoryModal() {
    // Router
    const navigate = useNavigate()

    // Modal
    const closeModal = useModalState(state => state.closeModal)

    // Get queries
    const { data: categories } = useGetCategoryQuery()

    return(
        <>
            {
                categories?.map(category => (
                    <div 
                        className={cls.categoryWrapper} 
                        key={category.id} 
                        onClick={() => {
                            navigate(CATEGORY_ROUTE + `/${category.id}`)
                            closeModal()
                        }}
                    >
                        <div className={cls.categoryIcon}>
                            <img
                                src={getImageUrl(category.icon)}
                                alt={category?.name ? `Category icon: ${capitalizeFirstLetter(category.name)}` : 'Category icon'}
                            />
                        </div>
                        <h4>{capitalizeFirstLetter(category.name)}</h4>
                    </div>
                ))
            }
        </>
    )
}

export default CategoryModal