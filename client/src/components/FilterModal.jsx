import cls from '../styles/FilterModal.module.scss';
import { useCatalogState } from '../store/useCatalogState';
import { ReactComponent as XIcon } from '../assets/icons/x.svg';
import { ReactComponent as CheckboxCheckIcon } from '../assets/icons/checkbox-check.svg';

function FilterModal() {
    const isFilterModalOpen = useCatalogState((state) => state.isFilterModalOpen);
    const closeFilterModal = useCatalogState((state) => state.closeFilterModal);

    const handleFilterShow = () => {
        closeFilterModal()
    }

    return (
        <div 
            className={`${cls.FilterModal} ${isFilterModalOpen ? cls.open : ''}`} 
            onClick={(e) => e.stopPropagation()}
        >
             <div className={cls.filterTitleWrapper}>
                <div className={cls.filterHeader}>
                    <h4>Filters</h4>
                    <button onClick={closeFilterModal}>
                        <XIcon />
                    </button>
                </div>
            </div>
            <div className={cls.filterList}>
                <div className={cls.filterItem}>
                    <div className={cls.filterHeader}>
                        <h4>Price</h4>
                        <h5>↓</h5>
                    </div>
                    <div className={cls.priceItemsWrapper}>
                        <div className={cls.priceInput}>
                            <span>from</span>
                            <input type="text" placeholder='0'/>
                        </div>
                        <div className={cls.priceInput}>
                            <span>to</span>
                            <input type="text" placeholder='999 999'/>
                        </div>
                    </div>
                </div>
                <div className={cls.filterItem}>
                    <div className={cls.filterHeader}>
                        <h4>Delivery TIme</h4>
                        <h5>↓</h5>
                    </div>
                    <div className={cls.deliveryTimeItemsWrapper}>
                        <label htmlFor="delivery-time-1" className="neon-checkbox">
                            <input 
                                type="checkbox" 
                                id='delivery-time-1'
                            />
                            <div className="neon-checkbox__frame">
                                <div className="neon-checkbox__box"></div>
                                <CheckboxCheckIcon className="neon-checkbox__check" />
                                <div className="neon-checkbox__glow"></div>
                            </div>
                            <span>1 day</span>
                        </label>
                        <label htmlFor="delivery-time-2" className="neon-checkbox">
                            <input 
                                type="checkbox" 
                                id='delivery-time-2'
                            />
                            <div className="neon-checkbox__frame">
                                <div className="neon-checkbox__box"></div>
                                <CheckboxCheckIcon className="neon-checkbox__check" />
                                <div className="neon-checkbox__glow"></div>
                            </div>
                            <span>2 day</span>
                        </label>
                        <label htmlFor="delivery-time-3" className="neon-checkbox">
                            <input 
                                type="checkbox" 
                                id='delivery-time-3'
                            />
                            <div className="neon-checkbox__frame">
                                <div className="neon-checkbox__box"></div>
                                <CheckboxCheckIcon className="neon-checkbox__check" />
                                <div className="neon-checkbox__glow"></div>
                            </div>
                            <span>3 day</span>
                        </label>
                        <label htmlFor="delivery-time-4" className="neon-checkbox">
                            <input 
                                type="checkbox" 
                                id='delivery-time-4'
                            />
                            <div className="neon-checkbox__frame">
                                <div className="neon-checkbox__box"></div>
                                <CheckboxCheckIcon className="neon-checkbox__check" />
                                <div className="neon-checkbox__glow"></div>
                            </div>
                            <span>5 day</span>
                        </label>
                        <label htmlFor="delivery-time-5" className="neon-checkbox">
                            <input 
                                type="checkbox" 
                                id='delivery-time-5'
                            />
                            <div className="neon-checkbox__frame">
                                <div className="neon-checkbox__box"></div>
                                <CheckboxCheckIcon className="neon-checkbox__check" />
                                <div className="neon-checkbox__glow"></div>
                            </div>
                            <span>7 day</span>
                        </label>
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div className={cls.buttonsWrapper}>
                <button className={cls.showButton} onClick={handleFilterShow}>Show</button>
                <button className={cls.resetButton}>Reset</button>
            </div>
        </div>
    );
}

export default FilterModal;