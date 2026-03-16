import { addRecentlyViewed, getRecentlyViewed } from "@/http/recentlyViewedApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "./useUsersQuery";
import { v4 as uuidv4 } from 'uuid';
import { addToGuestRecentlyViewed, getGuestRecentlyViewed } from "@/utils/guestRecentlyViewed";

/**
 * Hook for fetching user's recently viewed products (authenticated or guest)
 * @returns {Object} React Query object with recently viewed data
 */
export function useGetRecentlyViewedQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['recentlyViewed'],
        queryFn: () => user ? getRecentlyViewed() : getGuestRecentlyViewed(),
    })
}

/**
 * Hook for adding a product to recently viewed list
 * Handles optimistic updates for both authenticated and guest users
 * @returns {Object} Mutation object
 */
export function useAddToRecentlyViewedQuery() {
    const queryClient = useQueryClient()
    const { data: user } = useAuthQuery()

    return useMutation({
        mutationFn: (product) => user ? addRecentlyViewed(product.id) : Promise.resolve(),
        
        // Optimistic update before API call
        onMutate: async (product) => {
            await queryClient.cancelQueries(['recentlyViewed']);
            const previousRecentlyViewed = queryClient.getQueryData(['recentlyViewed']);

            // Guest user - use localStorage recently viewed
            if (!user) {
                const newItems = addToGuestRecentlyViewed(product);
                queryClient.setQueryData(['recentlyViewed'], newItems);
                return { previousRecentlyViewed };
            }

            // Authenticated user - optimistic update
            queryClient.setQueryData(['recentlyViewed'], old => [{
                id: uuidv4(),
                productId: product.id,
                product: product,
            }, ...(old || [])]);

            return { previousRecentlyViewed };
        },
        
        // Refetch after successful mutation (authenticated users only)
        onSuccess: () => {
            if (user) {
                queryClient.invalidateQueries(['recentlyViewed']);
            }
        },
        
        // Rollback on error
        onError: (err, product, context) => {
            queryClient.setQueryData(['recentlyViewed'], context.previousRecentlyViewed);
            console.error(err);
        }
    })
}