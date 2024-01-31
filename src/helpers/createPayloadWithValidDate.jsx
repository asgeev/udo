export const createPayloadWithValidDate = (values) => {
    return {
        ...values,
        inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
        birth_date: values['birth_date']?.format('YYYY-MM-DD'),
        max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        requestor_act_date: values['requestor_act_date']?.format('YYYY-MM-DD'),
    }
}
