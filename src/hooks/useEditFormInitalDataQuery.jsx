import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
import { createNewObjectWithValidDate } from '@helpers/createNewObjectWithValidDate'

export const useEditFormInitalDataQuery = (currentRecordId) => {
    return useQuery({
        queryKey: ['editFormInitalData', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequest?id=${currentRecordId}`
            )
            return data
        },
        select: (data) => createNewObjectWithValidDate(data),
        enabled: currentRecordId && currentRecordId > 0,
        refetchOnWindowFocus: false,
        gcTime: 0,
        staleTime: 0,
    })
}
