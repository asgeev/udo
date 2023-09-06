import dayjs from 'dayjs'

export const createNewObjectWithValidDateFromEzd = (data) => {
    if (data) {
        let newObject = {
            ...data,
            inflow_date:
                data.inflow_date &&
                dayjs(parseInt(data?.inflow_date?.substring(6, 24))),

            birth_date:
                data.birth_date &&
                dayjs(parseInt(data?.birth_date.substring(6, 24))),

            max_finish_date:
                data.max_finish_date &&
                dayjs(parseInt(data?.max_finish_date?.substring(6, 24))),
            requestor_act_date:
                data.requestor_act_date &&
                dayjs(parseInt(data?.requestor_act_date?.substring(6, 24))),
        }
        return newObject
    }
}
