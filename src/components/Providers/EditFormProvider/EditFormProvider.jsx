import { useState, useLayoutEffect, createContext } from 'react'
import { Form, message } from 'antd'
import WP_Instance from '../../../services/WP_Instance'
import { createNewObjectWithValidDate } from '../../../helpers/createNewObjectWithValidDate'
export const EditFormContext = createContext({
    recordId: null,
    editForm: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
    initialFormData: null,
})

export const EditFormProvider = ({ children, recordId, showSecondDrawer }) => {
    const [formDisabled, setFormDisabled] = useState(false)
    const [editFormLoading, setEditFormLoading] = useState(false)
    const [onSubmitLoading, setSubmitLoading] = useState(false)
    const [initialFormData, setInitalFormData] = useState(null)
    const [error, setError] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [editForm] = Form.useForm()
    const [editMode, setEditMode] = useState(true)

    useLayoutEffect(() => {
        const fetchDataRequest = () => {
            WP_Instance.get(`/udo/v1/dataRequest?id=${recordId}`)
                .then((response) => {
                    setInitalFormData(
                        createNewObjectWithValidDate(response.data)
                    )
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {})
        }
        if (recordId) {
            fetchDataRequest()
        }
    }, [recordId])

    useLayoutEffect(() => {
        setInitialEditFormFieldsValues(initialFormData)
    }, [initialFormData])

    const setInitialEditFormFieldsValues = (values) => {
        console.log(values)
        editForm?.setFieldsValue(values)
    }

    const onSubmit = (values) => {
        console.log(values)
        const payload = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        }
        console.log(payload)
        setFormDisabled(true)
        setSubmitLoading(true)
        WP_Instance.put(
            `/udo/v1/dataRequest/?data_request_id=${recordId}`,
            payload
        )
            .then((response) => {
                console.log(response)
                messageApi.success(response?.data?.message)
            })
            .catch((error) => {
                setFormDisabled(false)
                messageApi.error(error?.resp?.message, 6, () =>
                    setFormDisabled(false)
                )

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // messageApi.error(error.response?.data?.message, 4)

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
            .finally(() => {
                setSubmitLoading(false)
                setFormDisabled(false)
            })
    }

    const onFinishFailed = (values) => {
        // messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    const onChange = (values) => {
        // console.log(values)
    }

    return (
        <EditFormContext.Provider
            value={{
                recordId,
                onSubmit,
                onFinishFailed,
                editForm,
                initialFormData,
                onChange,
                editFormLoading,
                onSubmitLoading,
                formDisabled,
                showSecondDrawer,
                error,
                setError,
                editMode,
                setEditMode,
            }}
        >
            {contextHolder}
            {children}
        </EditFormContext.Provider>
    )
}
