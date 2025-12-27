import { addSearchHistory } from "../http/searchHistoryApi";
import { create } from "zustand";

export const useSearchState = create((set) => ({
    searchProducts: [],
    setSearchProducts: (products) => set((state) => {
        return {...state, searchProducts: products}
    }),

    isSearchModalOpen: false,
    openSearchModal: () => set({ isSearchModalOpen: true }),
    closeSearchModal: () => set({ isSearchModalOpen: false }),

    inputValue: '',
    setInputValue: (value) => set({ inputValue: value }),

    searchHistory: [],
    // setSearchHistory: (searchItems) => set((state) => {
    //     return {...state, searchHistory: searchItems}
    // }),
    addToSearchHistory: (value) => set((state) => {
        if (state.searchHistory.some(item => item.value === value) || value === '') {
            return { searchHistory: state.searchHistory };
        }
        
        const newHistory = [...state.searchHistory, {id: state.searchHistory.length + 1, value}];
        
        if (newHistory.length > 4) {
            return { searchHistory: newHistory.slice(1) };
        }

        // addSearchHistory(value)
        
        return { searchHistory: newHistory };
    }),
    removeFromSearchHistory: (product) => set((state) => ({
        searchHistory: state.searchHistory.filter((searchHistoryProduct) => searchHistoryProduct.id !== product.id)
    })),

    searchRecommended: [
        {
            id: 1,
            name: 'T-shirt',
        },
        {
            id: 2,
            name: 'Polo',
        },
        {
            id: 3,
            name: 'Jeans',
        },
        {
            id: 4,
            name: 'Shoes',
        }
    ],
})) 