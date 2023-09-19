import { useState, useEffect, useLayoutEffect, createContext } from 'react'
import { Form, message } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { createNewObjectWithValidDate } from '@helpers/createNewObjectWithValidDate'
export const EditFormContext = createContext({
    recordId: null,
    editForm: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
    initialFormData: null,
    onChange: () => {},
    editFormLoading: false,
    formDisabled: false,
    showSecondDrawer: () => {},
    error: false,
    setError: () => {},
    editModel: false,
    setEditMode: () => {},
})

export const EditFormProvider = ({ children, recordId, showSecondDrawer }) => {
    const [formDisabled, setFormDisabled] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(false)
    const [initialFormData, setInitalFormData] = useState(null)
    const [messageApi, contextHolder] = message.useMessage()
    const [editForm] = Form.useForm()
    const [editMode, setEditMode] = useState(true)
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        if (recordId) {
            fetchData()
        }
    }, [recordId])

    useLayoutEffect(() => {
        setInitialEditFormFieldsValues(initialFormData)
    }, [initialFormData])

    const fetchData = () => {
        WP_Instance.get(`/udo/v1/dataRequest?id=${recordId}`)
            .then((response) => {
                setInitalFormData(createNewObjectWithValidDate(response.data))
                setError(false)
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
            .finally(() => {
                setDataLoading(false)
            })
    }

    const setInitialEditFormFieldsValues = (values) => {
        editForm?.setFieldsValue(values)
    }

    const onSubmit = (values) => {
        const payload = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
            requestor_act_date:
                values['requestor_act_date']?.format('YYYY-MM-DD'),
        }
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
                console.log(error)
                if (error.response) {
                    messageApi.error(error.response?.data?.message, 6)
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else {
                    messageApi.error(
                        'UPS!, wystąpił problem z zapisem formualrza, proszę spróbować później!'
                    )
                }
            })
            .finally(() => {
                setSubmitLoading(false)
                setFormDisabled(false)
                fetchData()
            })
    }

    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    const onChange = (values) => {
        console.log(values)
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
                submitLoading,
                formDisabled,
                showSecondDrawer,
                error,
                setError,
                editMode,
                setEditMode,
                dataLoading,
                setDataLoading,
            }}
        >
            {children}
            {contextHolder}
        </EditFormContext.Provider>
    )
}
