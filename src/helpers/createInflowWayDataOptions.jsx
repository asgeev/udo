export const createInflowWayDataOptions = (data) => {
    let newData = []

    if (Array.isArray(data)) {
        data?.forEach((element) => {
            newData.push({
                key: element?.id,
                value: element?.id,
                label: element?.name,
            })
        })
    }

    return newData
}
