export const createJrwaDataOptions = (jrwaData) => {
    let newData = []

    if (Array.isArray(jrwaData)) {
        jrwaData?.forEach((element, index) => {
            newData.push({
                key: index,
                value: element?.id,
                label: element?.name,
            })
        })
    }

    return newData
}
