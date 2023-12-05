import { useState, useEffect, useLayoutEffect, createContext } from 'react'
import { Form, message } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { useFirstDrawerContext } from '@hooks/useFirstDrawerContext'
//Helpers functions
import { createNewObjectWithValidDate } from '@helpers/createNewObjectWithValidDate'
import { b64toBlob } from '@helpers/b64toBlob'

export const EditFormContext = createContext({
    recordId: null,
    editForm: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
    initialFormData: null,
    onChange: () => {},
    editFormLoading: false,
    formDisabled: false,
    error: false,
    setError: () => {},
    editModel: false,
    setEditMode: () => {},
})

export const EditFormProvider = ({ children }) => {
    const [formDisabled, setFormDisabled] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(false)
    const [initialFormData, setInitalFormData] = useState(null)
    const [editMode, setEditMode] = useState(true)
    const [dataLoading, setDataLoading] = useState(true)

    const [messageApi, contextHolder] = message.useMessage()
    const [editForm] = Form.useForm()
    const { currentRecordId } = useRecordsViewContext()

    const { setIsFormChanged } = useFirstDrawerContext()

    useEffect(() => {
        if (currentRecordId) {
            fetchData(currentRecordId)
        }
    }, [currentRecordId])

    useLayoutEffect(() => {
        setInitialEditFormFieldsValues(initialFormData)
    }, [initialFormData])

    const fetchData = (currentRecordId) => {
        if (currentRecordId && currentRecordId >= 0) {
            WP_Instance.get(`/udo/v1/dataRequest?id=${currentRecordId}`)
                .then((response) => {
                    setInitalFormData(
                        createNewObjectWithValidDate(response.data)
                    )
                    setError(false)
                })
                .catch((error) => {
                    console.error(error)
                    setError(true)
                })
                .finally(() => {
                    setDataLoading(false)
                })
        } else {
            console.error('Invalid current record id!')
        }
    }

    const saveDataToApi = async (payload) => {
        return await WP_Instance.put(
            `/udo/v1/dataRequest?data_request_id=${currentRecordId}`,
            payload
        )
    }

    const downloadFile = async (id, filename = 'Opowiedz dla wnioskodawcy') => {
        if (id && id > 0) {
            try {
                const response = await WP_Instance.get(
                    `/udo/v1/generateWord?id=${id}`
                )
                const blob = b64toBlob(
                    response.data,
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                )
                const blobUrl = URL.createObjectURL(blob)
                const link = document.createElement('a')

                link.href = blobUrl
                link.setAttribute('download', `${filename}.docx`) //or any other extension
                link.click()
                link.remove()
            } catch (error) {
                console.error(
                    'Download file error! Passed file id is incorrect.'
                )
            }
        }
    }

    const setLoading = (boolean) => {
        setFormDisabled(boolean)
        setSubmitLoading(boolean)
    }

    const setInitialEditFormFieldsValues = (values) => {
        editForm?.setFieldsValue(values)
    }

    const createPayloadWithValidDate = (values) => {
        return {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
            requestor_act_date:
                values['requestor_act_date']?.format('YYYY-MM-DD'),
        }
    }

    const onSubmit = async (values) => {
        const payload = createPayloadWithValidDate(values)

        try {
            setLoading(true)
            const response = await saveDataToApi(payload)
            messageApi.success(response?.data?.message)
        } catch (error) {
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
        } finally {
            setLoading(false)
            setIsFormChanged(false)
        }
    }

    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    const onValuesChange = () => {
        setIsFormChanged(true)
    }

    const saveFormAndDownloadFile = async () => {
        const values = editForm.getFieldsValue(true)
        const payload = createPayloadWithValidDate(values)

        try {
            await editForm.validateFields(editForm)
            try {
                setLoading(true)
                const response = await saveDataToApi(payload)
                messageApi.success(response?.data?.message)

                await downloadFile(currentRecordId)
            } catch (error) {
                console.log(error)
                messageApi.error(
                    'Wystąpił problem z pobieraniem pliku prosimy spróbować później!'
                )
            } finally {
                setSubmitLoading(false)
                setFormDisabled(false)
                setLoading(false)
                setIsFormChanged(false)
            }
        } catch (error) {
            error.errorFields?.map((element) => {
                editForm.scrollToField(element?.name, {
                    block: 'center',
                    behavior: 'smooth',
                })
                onFinishFailed(error.errorFields)
            })
        }
    }

    return (
        <EditFormContext.Provider
            value={{
                onSubmit,
                onFinishFailed,
                editForm,
                initialFormData,
                onValuesChange,
                submitLoading,
                formDisabled,
                error,
                setError,
                editMode,
                setEditMode,
                dataLoading,
                setDataLoading,
                saveFormAndDownloadFile,
            }}
        >
            {children}
            {contextHolder}
        </EditFormContext.Provider>
    )
}
