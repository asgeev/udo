export const createCompanyDataOptions = (data) => {
    let newData = []

    data?.forEach((element) => {
        newData.push({
            key: element?.id,
            value: element?.name,
            label: `${element.name} |  Adres: ${element.street}  ${element.house}  ${element.apartment}  ${element.postcode}  ${element.city}`,
            ...element,
        })
    })
    return newData
}
