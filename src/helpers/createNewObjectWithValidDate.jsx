import dayjs from 'dayjs'

export const createNewObjectWithValidDate = (initialFormData) => {
    let newObject = {
        ...initialFormData,
        inflow_date:
            initialFormData.inflow_date && dayjs(initialFormData.inflow_date),

        birth_date:
            initialFormData.birth_date && dayjs(initialFormData.birth_date),

        max_finish_date:
            initialFormData.max_finish_date &&
            dayjs(initialFormData.max_finish_date),
        requestor_act_date:
            initialFormData.requestor_act_date &&
            dayjs(initialFormData.requestor_act_date),
    }

    return newObject
}
