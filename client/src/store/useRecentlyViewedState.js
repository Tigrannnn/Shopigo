import { addRecentlyViewed } from '../http/recentlyViewedApi';
import { create } from 'zustand';

export const useRecentlyViewedState = create((set) => ({
    recentlyViewed: [],

    setRecentlyViewed: (products) => set({ recentlyViewed: products }),

    addRecentlyViewed: (product) => set((state) => {
        // Check if product already exists in the list
        const existingIndex = state.recentlyViewed.findIndex(item => item.id === product.id);
        
        let updatedList;
        // if (existingIndex !== -1) {
        //     // If product exists, remove it from current position and add to end
        //     updatedList = [...state.recentlyViewed];
        //     updatedList.splice(existingIndex, 1);
        //     updatedList.push(product);
        // } else {
        //     // If product doesn't exist, add it to the end
        //     updatedList = [...state.recentlyViewed, product];
        // }

        if (existingIndex === -1) {
            addRecentlyViewed(product.id)
            updatedList = [...state.recentlyViewed, product];
        } else {
            return { recentlyViewed: state.recentlyViewed }
        }

        return { recentlyViewed: updatedList };
    }),
}));