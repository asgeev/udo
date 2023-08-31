export const createSignaturesDataOptions = (data) => {
    let newData = []

    data?.forEach((element) => {
        newData.push({
            key: element?.id,
            value: element?.id,
            label: element?.name,
        })
    })
    return newData
}
