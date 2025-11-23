import { create } from 'zustand';
import { useToastState } from './useToastState';

export const useFavoritesState = create((set) => ({
    favoriteProducts: [],
    
    addToFavorites: (product) => set((state) => ({
        favoriteProducts: [...state.favoriteProducts, product],
        toast: useToastState.getState().toast(
            'Product added to favorites',
            false,
            product
        )
    })),
    
    removeFromFavorites: (product) => set((state) => ({
        favoriteProducts: state.favoriteProducts.filter(
            (favoriteProduct) => favoriteProduct.id !== product.id
        ),
        toast: useToastState.getState().toast(
            'Product removed from favorites',
            true,
            product,
            () => {
                useFavoritesState.getState().addToFavorites(product);
            }
        )
    })),
}));
