import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
import { createSignaturesDataOptions } from '@helpers/createSignaturesDataOptions'

export const useGetSignatureListQuery = () => {
    return useQuery({
        queryKey: ['getSignatureList'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(`/udo/v1/signature`)
            return data
        },
        select: (data) => createSignaturesDataOptions(data),
    })
}
