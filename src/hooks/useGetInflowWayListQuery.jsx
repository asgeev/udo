import { useQuery } from '@tanstack/react-query'
import WP_Instance from '@services/WP_Instance'
import { createInflowWayDataOptions } from '@helpers/createInflowWayDataOptions'

export const useGetInflowWayListQuery = () => {
    return useQuery({
        queryKey: ['getInflowWayList'],
        queryFn: async () => {
            const { data } = await WP_Instance.get(`/udo/v1/inflowWay`)
            return data
        },
        select: (data) => createInflowWayDataOptions(data),
    })
}
