import { useQuery } from 'react-query'
import WP_Instance from '@services/WP_Instance'

export const useRequestHistory = (currentRecordId) => {
    return useQuery({
        queryKey: ['requestHistory', currentRecordId],
        //Refetch after 4000ms - remove this after add react query to all requests, add refetch on mutation editForm
        refetchInterval: 4000,
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/getDataRequestHistory?id=${currentRecordId}`
            )

            return data
        },
        enabled: currentRecordId > 0,
    })
}
