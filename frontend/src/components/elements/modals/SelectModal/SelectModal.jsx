// React
import { useMemo, useState } from 'react';

// Styles
import cls from './SelectModal.module.scss';

// Icons & Images
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

// Hooks
import useClickOutside from '@/hooks/useClickOutside';

// Utils
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { searchItems } from '@/utils/searchItems';
import { getImageUrl } from '@/utils/image';


function SelectModal({ items, handleSelect, selectedItem = null, top, isSearchModal = false, onClose }) {
    const [search, setSearch] = useState('')

    const filteredItems = useMemo(() => searchItems(items, search), [items, search])

    const modalRef = useClickOutside(onClose, { ignoreSelector: '[data-modal-trigger]' });

    return (
        <div 
            ref={modalRef} 
            className={cls.SelectModal}
            onClick={(e) => e.stopPropagation()} 
            style={{top: top}}
        >
            { 
                isSearchModal && (
                    <div className={cls.selectModalSearch}>
                        <SearchIcon />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                )
            }
            {
                filteredItems?.map((item) => (
                    <div
                        className={`${cls.selectModalItem} ${selectedItem?.name === item.name ? cls.active : ''}`}
                        key={item.code ?? item.id ?? item.name}
                        onClick={() => {
                            handleSelect(item);
                        }}
                    >
                        <span className={cls.icon}>
                            {
                                item.icon 
                                ? <img src={getImageUrl(item.icon)} alt={item.name}/> 
                                : item.IconComponent
                            }
                        </span>
                        <span className={cls.name}>{capitalizeFirstLetter(item.name)}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default SelectModal