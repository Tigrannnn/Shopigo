import { create } from 'zustand';

export const useRecentlyWatchedState = create((set) => ({
    recentlyWatched: [],
    addRecentlyWatched: (product) => set((state) => {
        // Check if product already exists in the list
        const existingIndex = state.recentlyWatched.findIndex(item => item.id === product.id);
        
        let updatedList;
        if (existingIndex !== -1) {
            // If product exists, remove it from current position and add to end
            updatedList = [...state.recentlyWatched];
            updatedList.splice(existingIndex, 1);
            updatedList.push(product);
        } else {
            // If product doesn't exist, add it to the end
            updatedList = [...state.recentlyWatched, product];
        }

        if (updatedList.length > 15) {
            updatedList.shift();
        }
        return { recentlyWatched: updatedList };
    }),
}));