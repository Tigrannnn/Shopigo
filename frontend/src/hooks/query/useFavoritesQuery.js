import { addFavoriteProduct, getFavorites, removeFavoriteProduct } from "@/http/favoritesApi";
import { useToastState } from "@/store/useToastState";
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "./useUsersQuery";
import { addToGuestFavorites, getGuestFavorites, removeFromGuestFavorites } from "@/utils/guestFavorites";

/**
 * Hook for fetching user's favorites (authenticated or guest)
 * @returns {Object} React Query object with favorites data
 */
export function useGetFavoritesQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['favorites'],
        queryFn: () => user ? getFavorites() : getGuestFavorites(),
        enabled: true,
        placeholderData: [],
        staleTime: 1000 * 60 * 5,
    })
}

/**
 * Hook for adding a product to favorites
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useAddToFavoritesQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (product) => user ? addFavoriteProduct(product.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (product) => {
            await queryClient.cancelQueries(['favorites']);
            const previousFavorites = queryClient.getQueryData(['favorites']);

            // Guest user - use localStorage favorites
            if (!user) {
                const newFavorites = addToGuestFavorites(product);
                queryClient.setQueryData(['favorites'], newFavorites);
                toast('Product added to favorites')
                return { previousFavorites };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['favorites'], old => [{
                id: uuidv4(),
                productId: product.id,
                product,
            }, ...(old || [])]);

            toast('Product added to favorites')
            return { previousFavorites };
        },
        
        // Refetch after successful mutation (authenticated users only)
        onSuccess: () => {
            if (user) {
                queryClient.invalidateQueries(['favorites']);
            }
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['favorites'], context.previousFavorites);
            toast('Failed to add product to favorites');
        }
    })
}

/**
 * Hook for removing a product from favorites
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useRemoveFromFavoritesQuery() {
    const toast = useToastState(state => state.toast)
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (product) => user ? removeFavoriteProduct(product.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (product) => {
            await queryClient.cancelQueries(['favorites']);
            const previousFavorites = queryClient.getQueryData(['favorites']);

            // Guest user - use localStorage favorites
            if (!user) {
                const newFavorites = removeFromGuestFavorites(product);
                queryClient.setQueryData(['favorites'], newFavorites);
                toast('Product removed from favorites')
                return { previousFavorites };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(
                ['favorites'],
                (old) => old.filter(favorite =>
                    favorite.product.id !== product.id
                )
            );
            toast('Product removed from favorites')
            return { previousFavorites };
        },
        
        // Refetch after successful mutation (authenticated users only)
        onSuccess: () => {
            if (user) {
                queryClient.invalidateQueries(['favorites']);
            }
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['favorites'], context.previousFavorites);
            toast('Failed to remove product from favorites');
        }
    })
}