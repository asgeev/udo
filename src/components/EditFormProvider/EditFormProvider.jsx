import { useState, useEffect, createContext } from 'react'
import { Form } from 'antd'
import WP_Instance from '../../services/WP_Instance'
import dayjs from 'dayjs'

export const EditFormContext = createContext({
    recordId: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
})

const createNewObjectWithValidDate = (initialFormDate) => {
    let newObject = {
        ...initialFormDate,
        inflow_date:
            initialFormDate.inflow_date && dayjs(initialFormDate.inflow_date),

        birth_date:
            initialFormDate.birth_date && dayjs(initialFormDate.birth_date),

        max_finish_date:
            initialFormDate.max_finish_date &&
            dayjs(initialFormDate.max_finish_date),
    }

    return newObject
}

export const EditFormProvider = ({ children, recordId, setIsLoading }) => {
    const [formDisabled, setFormDisabled] = useState(false)
    const [initialFormData, setInitalFormData] = useState({})
    const editForm = Form.useForm()

    useEffect(() => {
        if (recordId) {
            setIsLoading(true)
            WP_Instance.get(`/udo/v1/getDataRequestById?id=${recordId}`)
                .then((response) => {
                    setInitalFormData(
                        createNewObjectWithValidDate(response.data)
                    )
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [recordId])

    const onSubmit = (values) => {
        console.log(values)
        const payload = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        }
        console.log(payload)
        setLoading(true)
        setFormDisabled(true)
        WP_Instance.put(
            `/udo/v1/updateDataRequest/?data_request_id=${recordId}`,
            payload
        )
            .then((response) => {
                console.log(response)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setFormDisabled(false)
                messageApi.error(error?.resp?.message, 6, () =>
                    setFormDisabled(false)
                )

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    messageApi.error(error.response?.data?.message, 4)

                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
                console.log(error.config)
            })
    }

    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    return (
        <EditFormContext.Provider value={(recordId, onSubmit, onFinishFailed)}>
            {children}
        </EditFormContext.Provider>
    )
}
