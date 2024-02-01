import { useMutation, useQueryClient } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useEzdMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['ezdMutation'],
        mutationFn: ({ id, actionType }) => {
            return WP_Instance.put(
                `/udo/v1/${actionType.endpoint}?data_request_id=${id}`
            )
        },
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['getDataRequestList'] }),
        networkMode: 'always',
    })
}
