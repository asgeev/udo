export const newDataTableWithKey = (tableData) => {
    let newData = []

    tableData?.forEach((element) => {
        newData.push({
            key: element?.data_request_id,
            ...element,
        })
    })
    return newData
}
