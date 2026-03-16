import {
    addSearchHistory,
    getSearchHistory,
    getSearchRecommended,
    removeSearchHistory
} from "@/http/searchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthQuery } from "./useUsersQuery";

/**
 * Hook for fetching user's search history
 * Only enabled when user is authenticated
 * @param {string} searchValue - Optional search value to filter history
 * @returns {Object} React Query object with search history data
 */
export function useGetSearchHistoryQuery(searchValue) {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['searchHistory', searchValue],
        queryFn: () => getSearchHistory(searchValue),
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    })
}

/**
 * Hook for adding a search query to user's history
 * Invalidates search history on success
 * @returns {Object} Mutation object
 */
export function useAddToSearchHistory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (value) => addSearchHistory(value),
        
        // Invalidate search history queries on success
        onSuccess: () => {
            queryClient.invalidateQueries(['searchHistory'])
        }
    })
}

/**
 * Hook for removing a search history item
 * Invalidates search history on success
 * @returns {Object} Mutation object
 */
export function useRemoveFromSearchHistory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => removeSearchHistory(id),
        
        // Invalidate search history queries on success
        onSuccess: () => {
            queryClient.invalidateQueries(['searchHistory'])
        }
    })
}

/**
 * Hook for fetching search recommendations (products and categories)
 * Keeps previous data while loading new recommendations
 * @param {string} searchValue - Search term for recommendations
 * @returns {Object} React Query object with recommended items
 */
export function useGetSearchRecommendedQuery(searchValue) {
    return useQuery({
        queryKey: ['searchRecommended', searchValue],
        queryFn: () => getSearchRecommended(searchValue),
        keepPreviousData: true,
    })
}