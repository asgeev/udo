import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useExternalSystems = () => {
    return useQuery({
        queryKey: ['externalSystems'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(`/udo/v1/getApi`)

            return data
        },
    })
}
