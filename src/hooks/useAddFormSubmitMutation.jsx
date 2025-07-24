import { useMutation } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
// import { createPayloadWithValidDate } from '@helpers/createPayloadWithValidDate'

const createPayload = (values) => {
    //Filter only checked systems
    const checkedSystems = values?.external_systems_checkbox?.filter(
        (item) => item.checked === true
    )

    return {
        ...values,
        inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
        birth_date: values['birth_date']?.format('YYYY-MM-DD'),
        max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        requestor_act_date: values['requestor_act_date']?.format('YYYY-MM-DD'),
        external_systems_checkbox: checkedSystems.map((item) => ({
            ...item,
            date_from: item?.date_from?.format('YYYY-MM-DD'),
            date_to: item?.date_to?.format('YYYY-MM-DD'),
            columns: item?.columns?.map((item) => ({ id: item })),
        })),
    }
}

export const useAddFormSubmitMutation = () => {
    return useMutation({
        mutationKey: ['submitAddForm'],
        mutationFn: (payload) => {
            const data = createPayload(payload)
            return WP_Instance.post(`/udo/v1/dataRequest`, data)
        },
        networkMode: 'always',
        enable: false,
        gcTime: 0,
    })
}
