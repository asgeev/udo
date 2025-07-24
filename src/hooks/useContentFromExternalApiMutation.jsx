import { useMutation, useQueryClient } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

const createPayload = (values) => {
    //Get only checked values
    const checkedSystems = values?.external_systems_checkbox?.filter(
        (item) => item.checked === true
    )

    return {
        ...values,
        external_systems_checkbox: checkedSystems.map((item) => ({
            ...item,
            date_from: item.date_from?.format('YYYY-MM-DD'),
            date_to: item.date_to?.format('YYYY-MM-DD'),
            columns: item?.columns?.map((item) => ({ id: item })),
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
