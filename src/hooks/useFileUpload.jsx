import { useMutation, useQueryClient } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useFileUpload = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['uploadFile'],
        mutationFn: ({ file, currentRecordId }) => {
            if (!currentRecordId || !file) {
                throw new Error('You must provide file and record id!')
            }
            const fileForm = new FormData()
            fileForm.append('file', file)
            fileForm.append('data_request_id', currentRecordId)
            return WP_Instance.post(`/udo/v1/attachments`, fileForm)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['attachments'] })
        },
        networkMode: 'always',
    })
}
