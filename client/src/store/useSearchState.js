import { create } from "zustand";

export const useSearchState = create((set) => ({
    isSearchModalOpen: false,
    openSearchModal: () => set({ isSearchModalOpen: true }),
    closeSearchModal: () => set({ isSearchModalOpen: false }),

    inputValue: '',
    setInputValue: (value) => set({ inputValue: value }),

    searchHistory: [],
    addToSearchHistory: (value) => set((state) => {
        // Если значение уже существует или пустое, возвращаем текущее состояние
        if (state.searchHistory.some(item => item.value === value) || value === '') {
            return { searchHistory: state.searchHistory };
        }
        
        // Добавляем новый элемент
        const newHistory = [...state.searchHistory, {id: state.searchHistory.length + 1, value}];
        
        // Если больше 4 элементов, удаляем самый старый (первый)
        if (newHistory.length > 4) {
            return { searchHistory: newHistory.slice(1) };
        }
        
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