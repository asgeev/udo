import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useAttachments = (id) => {
    return useQuery({
        queryKey: ['attachments', id],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequest/${id}/attachments`
            )

            return data
        },
        enabled: !!id,
    })
}
