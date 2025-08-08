import { useMutation, useQueryClient } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

const createPayload = (values) => {
    if (!values) throw Error('Must provide values')

    const { external_systems_checkbox } = values

    return {
        ...values,
        external_systems_checkbox: external_systems_checkbox?.map((item) => ({
            ...item,
            date_from: item.date_from?.format('YYYY-MM-DD'),
            date_to: item.date_to?.format('YYYY-MM-DD'),
        })),
    }
}

export const useContentFromExternalApiMutation = (currentRecordId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['contentFromExternalApiMutation'],
        mutationFn: (payload) => {
            const data = createPayload(payload)

            return WP_Instance.post(
                `/udo/v1/dataRequestExternalSystems/${currentRecordId}`,
                data
            )
        },
        networkMode: 'always',
        enabled: !!currentRecordId,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['jobs', currentRecordId],
            })
        },
    })
}
