import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

export const useGetAttachmentUrl = () => {
    return useMutation({
        mutationKey: ['attachment-url'],
        mutationFn: (id) => {
            return WP_Instance.get(`/udo/v1/attachments/${id}`)
        },
    })
}

export const useDeleteAttachment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['delete-attachment'],
        mutationFn: (id) => {
            return WP_Instance.delete(`/udo/v1/attachments/${id}`)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['attachments'],
            })
        },
    })
}
