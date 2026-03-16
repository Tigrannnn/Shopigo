import {
    createCategory,
    deleteCategory,
    getCategories,
    getOneCategory,
    updateCategory
} from "@/http/categoryApi";
import { useErrorState } from "@/store/useErrorState";
import { useModalState } from "@/store/useModalState";
import { useToastState } from "@/store/useToastState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for fetching all categories
 * @returns {Object} React Query object with categories data
 */
export function useGetCategoryQuery() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })
}

/**
 * Hook for fetching a single category by ID
 * @param {string|number} id - Category ID
 * @returns {Object} React Query object with category data
 */
export function useGetCategoryByIdQuery(id) {
    return useQuery({
        queryKey: ['categories', id],
        queryFn: () => getOneCategory(id)
    })
}

/**
 * Hook for creating a new category
 * Invalidates categories list on success
 * @returns {Object} Mutation object
 */
export function useCreateCategoryQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (category) => createCategory(category),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast('Category created successfully')
            closeModal()
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to create category')
        }
    })
}

/**
 * Hook for updating an existing category
 * Invalidates categories list on success
 * @returns {Object} Mutation object
 */
export function useUpdateCategoryQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)
    const closeModal = useModalState(state => state.closeModal)
    const setError = useErrorState(state => state.setError)

    return useMutation({
        mutationFn: (category) => updateCategory(category),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast('Category updated successfully')
            closeModal()
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to update category')
        }
    })
}

/**
 * Hook for deleting a category
 * Invalidates categories list on success
 * @returns {Object} Mutation object
 */
export function useDeleteCategoryQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: (id) => deleteCategory(id),
        
        // Invalidate queries and show toast on success
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast('Category deleted successfully')
        }
    })
}