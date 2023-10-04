export const createCompanyDataOptions = (data) => {
    let newData = []

    data?.forEach((element) => {
        newData.push({
            value: element?.id,
            label: `${element?.name} |  Adres: ${element?.street}  ${
                element.house
            }${element.apartment ? `/${element.apartment}` : ''}, ${
                element.postcode
            } ${element.city}`,
            ...element,
        })
    })
    return newData
}
