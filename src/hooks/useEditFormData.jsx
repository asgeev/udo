import { useQuery } from 'react-query'
import WP_Instance from '@services/WP_Instance'

export const useEditFormData = (currentRecordId) => {
    return useQuery({
        queryKey: ['editFormData', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequest?id=${currentRecordId}`
            )

            return data
        },
        enabled: currentRecordId > 0,
    })
}
