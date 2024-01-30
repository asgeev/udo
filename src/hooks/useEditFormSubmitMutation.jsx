import { useMutation } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

const createPayloadWithValidDate = (values) => {
    return {
        ...values,
        inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
        birth_date: values['birth_date']?.format('YYYY-MM-DD'),
        max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        requestor_act_date: values['requestor_act_date']?.format('YYYY-MM-DD'),
    }
}

export const useEditFormSubmitMutation = (currentRecordId) => {
    return useMutation({
        mutationKey: ['submitEditForm'],
        mutationFn: (payload) => {
            const data = createPayloadWithValidDate(payload)
            return WP_Instance.put(
                `/udo/v1/dataRequest?data_request_id=${currentRecordId}`,
                data
            )
        },
        networkMode: 'always',
    })
}
