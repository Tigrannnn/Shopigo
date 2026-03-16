import { auth, changeUserInfo, logout, login, sendCode, googleLogin, changeUserRole, getUsers } from "@/http/userApi";
import { mergeBasket } from "@/http/basketApi";
import { mergeFavorites } from "@/http/favoritesApi";
import { mergeRecentlyViewed } from "@/http/recentlyViewedApi";
import { getGuestBasket, clearGuestBasket } from "@/utils/guestBasket";
import { getGuestFavorites, clearGuestFavorites } from "@/utils/guestFavorites";
import { getGuestRecentlyViewed, clearGuestRecentlyViewed } from "@/utils/guestRecentlyViewed";
import { useModalState } from "@/store/useModalState";
import { useToastState } from "@/store/useToastState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useErrorState } from "@/store/useErrorState";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "@/utils/constants/routes";

/**
 * Hook for user authentication and session management
 * Handles token validation, user data fetching, and guest data merging on login
 * @returns {Object} React Query object with user authentication data
 */
export function useAuthQuery() {
  const queryClient = useQueryClient();

  const token = localStorage.getItem('accessToken');

  return useQuery({
    queryKey: ['user'],
    queryFn: () => auth(),
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    
    // Merge guest data (basket, favorites, recently viewed) on successful auth
    onSuccess: async () => {
      // Merge guest basket
      const guestItems = getGuestBasket();
      if (guestItems && guestItems.length > 0) {
        try {
          await mergeBasket(guestItems);
          clearGuestBasket();
          queryClient.invalidateQueries(['basket']);
        } catch (e) {
          console.error('basket merge failed on auth', e);
        }
      }
      
      // Merge guest favorites
      const guestFavs = getGuestFavorites();
      if (guestFavs && guestFavs.length > 0) {
        try {
          await mergeFavorites(guestFavs);
          clearGuestFavorites();
          queryClient.invalidateQueries(['favorites']);
        } catch (e) {
          console.error('favorites merge failed on auth', e);
        }
      }
      
      // Merge guest recently viewed
      const guestRecently = getGuestRecentlyViewed();
      if (guestRecently && guestRecently.length > 0) {
        try {
          await mergeRecentlyViewed(guestRecently);
          clearGuestRecentlyViewed();
          queryClient.invalidateQueries(['recentlyViewed']);
        } catch (e) {
          console.error('recently viewed merge failed on auth', e);
        }
      }
    },
    
    // Handle invalid/expired tokens
    onError: (error) => {
      if (error?.response?.status === 404 || error?.response?.status === 401) {
        localStorage.removeItem('accessToken');
        queryClient.setQueryData(['user'], null);
      }
    },
  });
}

/**
 * Hook for updating user profile information
 * Invalidates user data, shows toast, and closes modal on success
 * @returns {Object} Mutation object
 */
export function useChangeUserInfoQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)
    const closeModal = useModalState(state => state.closeModal)

    return useMutation({
        mutationFn: (userData) => changeUserInfo(userData),
        
        // Invalidate queries, show toast, and close modal on success
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
            toast('User changed successfully')
            closeModal()
        }
    })
}

/**
 * Hook for user logout
 * Clears auth data, closes modal, and navigates to shop page
 * @returns {Object} Mutation object
 */
export function useLogoutQuery() {
    const queryClient = useQueryClient()
    const closeModal = useModalState(state => state.closeModal)
    const navigate = useNavigate()

    return useMutation({
        mutationFn: () => logout(),
        
        // Clear auth data and redirect on success
        onSuccess: () => {
            localStorage.removeItem('accessToken')
            queryClient.setQueriesData(['user'], null)
            closeModal()
            navigate(SHOP_ROUTE)
        }
    })
}

/**
 * Hook for sending verification code to user's email
 * @returns {Object} Mutation object
 */
export function useSendCodeQuery() {
    const setError = useErrorState(state => state.setError)
    const clearError = useErrorState(state => state.clearError)

    return useMutation({
        mutationFn: (email) => sendCode(email),
        
        // Clear error on success
        onSuccess: () => {
            clearError()
        },
        
        // Set error message on failure
        onError: (error) => {
            setError(error?.response?.data?.message || 'Failed to send code')
        }
    })
}

/**
 * Hook for user login with email and verification code
 * Handles guest data merging (basket, favorites, recently viewed) on successful login
 * @returns {Object} Mutation object
 */
export function useLoginQuery() {
    const queryClient = useQueryClient()
    const setError = useErrorState(state => state.setError)
    const clearError = useErrorState(state => state.clearError)

    return useMutation({
        mutationFn: ({ email, inputCode }) => login(email, inputCode),
        
        // Set user data and merge guest data on success
        onSuccess: async (data) => {
            clearError()
            queryClient.setQueryData(['user'], data.user)

            // Merge guest basket
            const guestItems = getGuestBasket()
            if (guestItems && guestItems.length > 0) {
                try {
                    await mergeBasket(guestItems)
                    clearGuestBasket()
                    queryClient.invalidateQueries(['basket'])
                } catch (e) {
                    // ignore merge errors; they are non‑fatal
                    console.error('basket merge failed', e)
                }
            }
            
            // Merge guest favorites
            const guestFavs = getGuestFavorites()
            if (guestFavs && guestFavs.length > 0) {
                try {
                    await mergeFavorites(guestFavs)
                    clearGuestFavorites()
                    queryClient.invalidateQueries(['favorites'])
                } catch (e) {
                    console.error('favorites merge failed', e)
                }
            }
            
            // Merge guest recently viewed
            const guestRecently = getGuestRecentlyViewed()
            if (guestRecently && guestRecently.length > 0) {
                try {
                    await mergeRecentlyViewed(guestRecently)
                    clearGuestRecentlyViewed()
                    queryClient.invalidateQueries(["recentlyViewed"])
                } catch (e) {
                    console.error('recently viewed merge failed', e)
                }
            }
        },
        
        // Set error message on failure
        onError: (error) => {
            setError(error?.response?.data?.message || 'Login failed')
        }
    })
}

/**
 * Hook for Google OAuth login
 * Handles guest data merging (basket, favorites, recently viewed) on successful login
 * @returns {Object} Mutation object
 */
export function useGoogleLoginQuery() {
    const queryClient = useQueryClient()
    const setError = useErrorState(state => state.setError)
    const clearError = useErrorState(state => state.clearError)

    return useMutation({
        mutationFn: (token) => googleLogin(token),
        
        // Set user data and merge guest data on success
        onSuccess: async (data) => {
            clearError()
            queryClient.setQueryData(['user'], data.user)

            // Merge guest basket
            const guestBasket = getGuestBasket()
            if (guestBasket && guestBasket.length > 0) {
                try {
                    await mergeBasket(guestBasket)
                    clearGuestBasket()
                    queryClient.invalidateQueries(['basket'])
                } catch (e) {
                    console.error('basket merge failed', e)
                }
            }
            
            // Merge guest favorites
            const guestFavs = getGuestFavorites()
            if (guestFavs && guestFavs.length > 0) {
                try {
                    await mergeFavorites(guestFavs)
                    clearGuestFavorites()
                    queryClient.invalidateQueries(['favorites'])
                } catch (e) {
                    console.error('favorites merge failed', e)
                }
            }
            
            // Merge guest recently viewed
            const guestRecently = getGuestRecentlyViewed()
            if (guestRecently && guestRecently.length > 0) {
                try {
                    await mergeRecentlyViewed(guestRecently)
                    clearGuestRecentlyViewed()
                    queryClient.invalidateQueries(["recentlyViewed"])
                } catch (e) {
                    console.error('recently viewed merge failed', e)
                }
            }
        },
        
        // Set error message on failure
        onError: (error) => {
            setError(error?.response?.data?.message || 'Google authentication failed')
        }
    })
}

/**
 * Hook for fetching users
 * Only enabled when user is authenticated
 * @returns {Object} React Query object with users data
 */
export function useGetUsersQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers({limit: 5}),
        enabled: !!user && user.role === 'ADMIN',
    })
}

/**
 * Hook for changing user role
 * @returns {Object} Mutation object
 */
export function useChangeUserRoleQuery() {
    const queryClient = useQueryClient()
    const toast = useToastState(state => state.toast)

    return useMutation({
        mutationFn: (id) => changeUserRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
            toast('User role changed successfully')
        },
        onError: (error) => {
            toast(error?.response?.data?.message || 'Failed to change user role')
        }
    })
}