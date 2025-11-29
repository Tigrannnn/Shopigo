import { create } from 'zustand';
import { useToastState } from './useToastState';
import { addFavoriteProduct, removeFavoriteProduct } from '../http/favoritesApi';

export const useFavoritesState = create((set) => ({
    favoriteProducts: [],

    setFavoriteProducts: (products) => set({ favoriteProducts: products }),
    
    addToFavorites: (product) => set((state) => {
        addFavoriteProduct(product.id);
        return{
            favoriteProducts: [...state.favoriteProducts, product],
            toast: useToastState.getState().toast(
                'Product added to favorites',
                false,
                product
            )
        };
    }),
    
    removeFromFavorites: (product) => set((state) => {
        removeFavoriteProduct(product.id);
        return{
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
        }
    }),
}));
