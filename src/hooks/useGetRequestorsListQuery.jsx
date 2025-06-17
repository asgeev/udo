import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'

export const useGetRequestorsListQuery = () => {
    return useQuery({
        queryKey: ['getRequestorList'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(`/udo/v1/requestor`)

            return data
        },
    })
}
