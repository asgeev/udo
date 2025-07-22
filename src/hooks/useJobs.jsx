import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useJobsMutation = (currentRecordId) => {
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
            })),
        }
    }

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['jobs-mutation'],
        mutationFn: (payload) => {
            const data = createPayload(payload)
            return WP_Instance.post(
                `/udo/v1/dataRequestExternalSystems/${currentRecordId}`,
                data
            )
        },
        networkMode: 'always',
        enabled: !!currentRecordId,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['jobs', currentRecordId],
            })
        },
    })
}

export const useJobs = (currentRecordId) => {
    return useQuery({
        queryKey: ['jobs', currentRecordId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/dataRequestExternalSystems/${currentRecordId}`
            )

            return data
        },
        enabled: currentRecordId > 0,
    })
}
