export const createJrwaDataOptions = (jrwaData) => {
    let newData = []

    jrwaData?.forEach((element, index) => {
        newData.push({
            key: index,
            value: element?.id,
            label: element?.name,
        })
    })
    return newData

    // return (newData = [
    //     { id: '1', name: 'Standard' },
    //     { id: '2', name: 'Pilne' },
    // ])
}
