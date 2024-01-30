import { useState, createContext } from 'react'
import { Form, message } from 'antd'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { useFirstDrawerContext } from '@hooks/useFirstDrawerContext'
import { useEditFormInitalDataQuery } from '@hooks/useEditFormInitalDataQuery'
import { useGenerateWordQuery } from '@hooks/useGenerateWordQuery'
import { useEditFormSubmitMutation } from '@hooks/useEditFormSubmitMutation'

//Helpers functions
import { b64toBlob } from '@helpers/b64toBlob'

export const EditFormContext = createContext({
    currentRecordId: null,
    initalData: null,
    isDataLoading: false,
    onSubmit: () => {},
    onFinishFailed: () => {},
    onValuesChange: () => {},
    setFormError: () => {},
    saveFormAndDownloadFile: () => {},
    editForm: null,
    formError: null,
    editMode: true,
    isFormSubmitting: false,
})

export const EditFormProvider = ({ children }) => {
    const editMode = true

    const [formError, setFormError] = useState(false)

    const [messageApi, contextHolder] = message.useMessage()

    const [editForm] = Form.useForm()

    const { currentRecordId } = useRecordsViewContext()

    const { setIsFormChanged } = useFirstDrawerContext()

    //Fetch inital form data
    const { data: initalData, isPending: isDataLoading } =
        useEditFormInitalDataQuery(currentRecordId)

    //Submit form
    const { mutateAsync, isPending: isFormSubmitting } =
        useEditFormSubmitMutation(currentRecordId)

    //Fetch blob for word file
    const { refetch: refetchFileBlob } = useGenerateWordQuery(currentRecordId)

    const generateWord = async (filename = 'Opowiedz dla wnioskodawcy') => {
        try {
            const response = await refetchFileBlob()
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
            console.error('Download file error! Passed file id is incorrect.')
        }
    }

    const submitForm = async (values) => {
        return mutateAsync(values, {
            onSuccess: (response) => {
                messageApi.success(response?.data?.message)
                setIsFormChanged(false)
            },
            onError: (error) => {
                if (error.response) {
                    messageApi.error(error.response?.data?.message, 6)
                } else {
                    messageApi.error(
                        'UPS! wystąpił problem z zapisem formularza, proszę spróbować później!'
                    )
                }
            },
        })
    }

    const onSubmit = (values) => {
        submitForm(values)
    }

    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    const onValuesChange = () => {
        setIsFormChanged(true)
    }

    const saveFormAndDownloadFile = async () => {
        //Get all values from form
        const values = editForm.getFieldsValue(true)

        try {
            await editForm.validateFields()
            try {
                await submitForm(values)
                await generateWord()
            } catch (error) {
                messageApi.error(
                    'Wystąpił problem z pobieraniem pliku prosimy spróbować później!'
                )
            }
        } catch (error) {
            //Scroll to first filed with error
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
                initalData,
                isDataLoading,
                onSubmit,
                onFinishFailed,
                onValuesChange,
                setFormError,
                saveFormAndDownloadFile,
                editForm,
                formError,
                editMode,
                isFormSubmitting,
            }}
        >
            {children}
            {contextHolder}
        </EditFormContext.Provider>
    )
}
