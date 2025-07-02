import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useCwuData = (currentRecordId) => {
    return useQuery({
        queryKey: ['cwuData', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequestExternalSystems/${currentRecordId}`
            )

            return data
        },
        enabled: currentRecordId > 0,
        refetchOnWindowFocus: false,
    })
}
