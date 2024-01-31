import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, message, Modal, Typography } from 'antd'
import { ModalStepsView } from '@molecules/ModalStepsView/ModalStepsView'
import { createNewObjectWithValidDateFromEzd } from '@helpers/createNewObjectWithValidDateFromEzd'
import { useAddFormSubmitMutation } from '@hooks/useAddFormSubmitMutation'
import { fetchDataFromKoszulkaQuery } from '@hooks/fetchDataFromKoszulkaQuery'
import { useQueryClient } from '@tanstack/react-query'

export const AddFormContext = createContext({
    addForm: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
    error: false,
    setError: () => {},
    isFormSubmitting: false,
    getMetaDataFromEzd: () => {},
})

export const AddFormProvider = ({ children }) => {
    const [error, setError] = useState(false)
    const [addForm] = Form.useForm()
    const navigate = useNavigate()
    const [modal, modalContextHolder] = Modal.useModal()
    const [messageApi, messageContextHolder] = message.useMessage()
    const { Title } = Typography
    const queryClient = useQueryClient()

    //Submit form query
    const { mutateAsync: submitFormMutate, isPending: isFormSubmitting } =
        useAddFormSubmitMutation()

    const submitForm = (values) => {
        return submitFormMutate(values, {
            onSuccess: (response) => {
                showSuccesModal(response?.data)
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

    // On submit form
    const onSubmit = (values) => {
        submitForm(values)
    }

    //Form failed
    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    //Show succes modal after succes response
    const showSuccesModal = (stepsItems = []) => {
        const handleOk = () => {
            addForm.resetFields()
            instance.destroy()
            window.scrollTo({ top: '0', behavior: 'smooth' })
        }
        const instance = modal.confirm({
            title: (
                <Title level={4} style={{ margin: 0 }}>
                    Gratulacje!
                </Title>
            ),
            content: <ModalStepsView stepsItems={stepsItems} />,
            destroyOnClose: true,
            centered: true,
            width: 600,
            icon: null,
            okText: 'Ok',
            onOk() {
                handleOk()
            },
            cancelText: 'Edytuj wpis',
            onCancel() {
                navigate('/podglad')
            },
        })
    }

    const showLoadingMessage = () => {
        messageApi.open({
            key: 'loading',
            type: 'loading',
            content: 'Pobieranie danych z ezd...',
            duration: 0,
        })
    }

    const setFormFields = (data) => {
        const fieldsValue = createNewObjectWithValidDateFromEzd(data)
        addForm?.setFieldsValue(fieldsValue)
    }

    const getMetaDataFromEzd = async () => {
        const koszulkaId = addForm?.getFieldValue('inflow_koszulka_id')
        if (koszulkaId) {
            showLoadingMessage()
            try {
                const data = await fetchDataFromKoszulkaQuery(
                    queryClient,
                    koszulkaId
                )
                setFormFields(data)
                messageApi.success('Dane z EZD zostały wstawione ', 4)
            } catch (error) {
                console.error(error)
                messageApi.error(`Niestety nie udało się pobrać danych z EZD`)
                // If response exist, show error message from server
                error?.response?.data &&
                    messageApi.error(`${error?.response?.data?.description}`)
            } finally {
                messageApi.destroy('loading')
            }
        } else {
            messageApi.error('Podaj nr koszulki wpływającej')
        }
    }

    return (
        <AddFormContext.Provider
            value={{
                addForm,
                onSubmit,
                onFinishFailed,
                error,
                setError,
                isFormSubmitting,
                getMetaDataFromEzd,
            }}
        >
            {messageContextHolder}
            {modalContextHolder}
            {children}
        </AddFormContext.Provider>
    )
}
