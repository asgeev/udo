import { useQuery } from 'react-query'
import WP_Instance from '@services/WP_Instance'
import { createJrwaDataOptions } from '@helpers/createJrwaDataOptions'

export const useGetJRWAListQuery = () => {
    return useQuery({
        queryKey: ['jrwaList'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(`/udo/v1/getJRWAList`)

            return data
        },
        select: (data) => createJrwaDataOptions(data),
    })
}
