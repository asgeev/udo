import { useQuery } from 'react-query'
import WP_Instance from '@services/WP_Instance'

export const useCwuData = (currentRecordId) => {
    return useQuery({
        queryKey: ['cwuData', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/apiCall?data_request_id=${currentRecordId}&api_id=${1}`
            )

            return data
        },
        enabled: currentRecordId > 0,
        refetchOnWindowFocus: false,
    })
}
