import { useInfiniteQuery } from '@tanstack/react-query'
import { shopsApi, ShopsResponse } from '@/lib/services/shops'

export function useInfiniteShops(term: string, type: 'query' | 'area') {
    return useInfiniteQuery<ShopsResponse>({
        queryKey: ['shops', type, term],
        queryFn: async ({ pageParam = 1 }) => {
            const response = type === 'query'
                ? await shopsApi.getByQuery(term, Number(pageParam))
                : await shopsApi.getByArea(term)

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
