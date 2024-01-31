import { useMutation } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
import { createPayloadWithValidDate } from '@helpers/createPayloadWithValidDate'

export const useAddFormSubmitMutation = () => {
    return useMutation({
        mutationKey: ['submitAddForm'],
        mutationFn: (payload) => {
            const data = createPayloadWithValidDate(payload)
            return WP_Instance.post(`/udo/v1/dataRequest`, data)
        },
        networkMode: 'always',
        enable: false,
        gcTime: 0,
    })
}
