import capitalizeFirstLetter from '../../utils/useCapitalizeFirsLetter'
import cls from '../../styles/components/modals/SelectModal.module.scss'
import { useState } from 'react'
import { useSelectState } from '../../store/useSelectState'

function SelectModal({ items, handleSelect, selectedItem = null }) {
    const [search, setSearch] = useState('')

    const closeSelectModal = useSelectState(state => state.closeSelectModal)

    const filterItems = (items, search) => {
        const query = search.trim().toLowerCase()
        if (!query) return items
        return items.filter((item) => {
            const name = item.name.toLowerCase()

            return name.includes(query) || item.code?.includes(query) || item.flag?.includes(query)
        })
    }

    const filteredItems = filterItems(items, search)
    

    return (
        <div className={cls.SelectModal} onClick={(e) => e.stopPropagation()}>
            <div className={cls.selectModalSearch}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {
                filteredItems?.map((item) => (
                    <div
                        className={`${cls.selectModalItem} ${selectedItem?.name === item.name ? cls.active : ''}`} 
                        key={item.code ?? item.id} 
                        onClick={(e) => (
                            handleSelect(item),
                            closeSelectModal()
                        )}
                    >
                        <span className={cls.flag}>
                            {item.flag ? item.flag : <img src={process.env.REACT_APP_API_URL + item.icon}/>}
                        </span>
                        <span className={cls.name}>{capitalizeFirstLetter(item.name)}</span>
                        {item.code && <span className={cls.selectModalItemCode}>{item.code}</span>}
                    </div>
                ))
            }
        </div>
    )
}

export default SelectModal