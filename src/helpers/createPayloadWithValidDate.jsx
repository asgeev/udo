export const createPayloadWithValidDate = (values) => {
    //Filter only checked systems
    const checkedSystems = values?.external_systems_checkbox?.filter(
        (item) => item.checked === true
    )

    return {
        ...values,
        inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
        birth_date: values['birth_date']?.format('YYYY-MM-DD'),
        max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        requestor_act_date: values['requestor_act_date']?.format('YYYY-MM-DD'),
        external_systems_checkbox: checkedSystems.map((item) => ({
            ...item,
            date_from: item.date_from.format('YYYY-MM-DD'),
            date_to: item.date_to.format('YYYY-MM-DD'),
        })),
    }
}
