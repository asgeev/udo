import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, message, Modal, Typography } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { ModalStepsView } from '@molecules/ModalStepsView/ModalStepsView'

export const AddFormContext = createContext({
    addForm: null,
    onSubmit: () => {},
    onFinishFailed: () => {},
    submitLoading: false,
    formDisabled: false,
    error: false,
    setError: () => {},
})

export const AddFormProvider = ({ children }) => {
    const [formDisabled, setFormDisabled] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(false)
    const [addForm] = Form.useForm()
    const navigate = useNavigate()
    const [modal, modalContextHolder] = Modal.useModal()
    const [messageApi, messageContextHolder] = message.useMessage()
    const { Title } = Typography

    // On submit form
    const onSubmit = (values) => {
        const payload = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
            requstor_act_date:
                values['requestor_act_date']?.format('YYYY-MM-DD'),
        }
        console.log(payload)
        setSubmitLoading(true)
        setFormDisabled(true)
        WP_Instance.post(`/udo/v1/dataRequest`, payload)
            .then((response) => {
                console.log(response)
                showSuccesModal(response?.data)
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    messageApi.error(error.response?.data?.message, 6)

                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else {
                    messageApi.error(
                        'USP, wystąpił problem z zapisem formualrza, proszę spróbować później!'
                    )
                }
            })
            .finally(() => {
                setSubmitLoading(false)
                setFormDisabled(false)
            })
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
            setFormDisabled(false)
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

    return (
        <AddFormContext.Provider
            value={{
                addForm,
                onSubmit,
                onFinishFailed,
                submitLoading,
                formDisabled,
                error,
                setError,
            }}
        >
            {messageContextHolder}
            {modalContextHolder}
            {children}
        </AddFormContext.Provider>
    )
}
