import { message, Form, Alert, Modal, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WP_Instance from '@services/WP_Instance'
import { AddForm } from '@organisms/AddForm/AddForm'
import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { ModalStepsView } from '@molecules/ModalStepsView/ModalStepsView'

export const MainAdd = () => {
    const { Title } = Typography
    const [messageApi, messageContextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)
    const [formDisabled, setFormDisabled] = useState(false)
    const [error, setError] = useState(false)
    const [modal, modalContextHolder] = Modal.useModal()
    const [form] = Form.useForm()
    const navigate = useNavigate()

    //Show succes modal after succes response
    const showSuccesModal = (stepsItems = []) => {
        const handleOk = () => {
            form.resetFields()
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
                navigate('/')
            },
        })
    }

    //Form failed
    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 7)
        console.log('Failed:', values)
    }

    // On submit form
    const onSubmit = (values) => {
        const payload = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        }
        console.log(payload)
        setLoading(true)
        setFormDisabled(true)
        WP_Instance.post(`/udo/v1/dataRequest`, payload)
            .then((response) => {
                console.log(response)
                setLoading(false)
                showSuccesModal(response?.data)
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

    return (
        <>
            {messageContextHolder}
            {modalContextHolder}
            {error && (
                <Alert
                    message="Ups! Wystąpił błąd"
                    description="Podczas pobierania danych formularza wystapił błąd, spróbuj przeładować stronę naciskając przyciski CTRL + F5. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony."
                    type="error"
                    showIcon
                />
            )}
            <PageTitleHeader title="Zarejestruj zapytanie" />
            <AddForm
                onSubmit={onSubmit}
                onFinishFailed={onFinishFailed}
                loading={loading}
                formDisabled={formDisabled}
                setError={setError}
                form={form}
            />
        </>
    )
}
