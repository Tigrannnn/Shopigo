import { useAuthQuery } from "./useUsersQuery"
import { useQuery } from "@tanstack/react-query"
import { getAdminStats } from "@/http/adminApi"


/** 
 * Hook for fetching admin stats
 * @returns {Object} React Query object with admin stats data
 */
export function useGetAdminStatsQuery() {
    const { data: user } = useAuthQuery()

    return useQuery({
        queryKey: ['adminStats'],
        queryFn: () => getAdminStats(),
        enabled: !!user,
    })
}