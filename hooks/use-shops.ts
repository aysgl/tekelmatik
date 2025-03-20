import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { shopsApi, ShopsResponse } from '@/lib/services/shops'

export function useInfiniteShops(term: string, type: 'query' | 'area') {
    return useInfiniteQuery<ShopsResponse>({
        queryKey: ['shops', type, term],
        queryFn: async ({ pageParam = 1 }) => {
            const response = type === 'query'
                ? await shopsApi.getByQuery(term, Number(pageParam))
                : await shopsApi.getByArea(term, Number(pageParam))

            return response
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage?.meta) return undefined;
            return lastPage.meta.page < lastPage.meta.total_pages
                ? lastPage.meta.page + 1
                : undefined;
        },
        initialPageParam: 1
    })
}

export function useShopsByLocation(location: { latitude: number; longitude: number }) {
    return useQuery({
        queryKey: ['shops', 'location', location.latitude, location.longitude],
        queryFn: async () => {
            const response = await shopsApi.getByLocation({
                latitude: location.latitude,
                longitude: location.longitude
            })

            const area = response.data.find(shop => shop.shop_area?.administrative_area_level_4)
            return area?.shop_area
        },
        enabled: !!location.latitude && !!location.longitude,
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}
