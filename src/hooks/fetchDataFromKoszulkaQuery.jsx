import WP_Instance from '@services/WP_Instance'

export const fetchDataFromKoszulkaQuery = async (queryClient, koszulkaId) => {
    return queryClient.fetchQuery({
        queryKey: ['getDataFromKoszulkaQuery', koszulkaId],
        queryFn: async () => {
            const { data } = await WP_Instance.get(
                `udo/v1/getDataFromKoszulka?id=${koszulkaId}`
            )
            return data
        },
        enabled: !!koszulkaId,
        networkMode: 'always',
    })
}
