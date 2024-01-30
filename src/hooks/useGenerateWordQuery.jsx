import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useGenerateWordQuery = (currentRecordId) => {
    return useQuery({
        queryKey: ['generateWord', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/generateWord?id=${currentRecordId}`
            )
            return data
        },
        enabled: false,
        refetchOnMount: false,
        gcTime: 0,
        staleTime: 0,
    })
}
