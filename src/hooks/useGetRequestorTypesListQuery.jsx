import { useQuery } from 'react-query'
import WP_Instance from '@services/WP_Instance'

export const useGetRequestorTypesListQuery = () => {
    return useQuery({
        queryKey: ['getRequestorTypesList'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `/udo/v1/getRequestorTypesList`
            )

            return data
        },
    })
}
