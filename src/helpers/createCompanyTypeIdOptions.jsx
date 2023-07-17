export const createCompanyTypeIdOptions = (companyTypeList) => {
    let newData = []

    companyTypeList?.forEach((companyTypeList) => {
        newData.push({
            key: companyTypeList.id,
            value: companyTypeList?.id,
            label: companyTypeList?.name,
        })
    })

    return newData
}
