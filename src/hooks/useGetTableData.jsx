import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
import { newDataTableWithKey } from '@helpers/newDataTableWithKey'

export const useGetTableData = (searchParams) => {
    const currentPage = searchParams.get('page')
    const perPage = searchParams.get('per_page')
    const search_query = searchParams.get('search_query')

    return useQuery({
        queryKey: ['getDataRequestList', currentPage, perPage, search_query],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequest?${searchParams}`
            )
            return data
        },
        //return entire response object with changed data table (add keys)
        select: (data) => ({ ...data, data: newDataTableWithKey(data.data) }),
        keepPreviousData: true,
    })
}
