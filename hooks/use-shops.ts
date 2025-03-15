import { useQuery } from '@tanstack/react-query'
import { shopsApi } from '@/lib/services/shops'

export function useShops() {
    return useQuery({
        queryKey: ['shops'],
        queryFn: () => shopsApi.getShops()
    })
}

export function useShopsByQuery(query: string) {
    return useQuery({
        queryKey: ['shops', 'search', query],
        queryFn: () => shopsApi.getByQuery(query),
        enabled: !!query
    })
}