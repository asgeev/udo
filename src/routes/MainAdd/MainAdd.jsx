import { useNavigate } from 'react-router-dom'
import { message, notification, Space, Button } from 'antd'
import { useState } from 'react'
import WP_Instance from '../../services/WP_Instance'
import { AddForm } from '../../components/AddForm/AddForm'
import { StepsView } from '../../components/StepsView/Steps'
import { MainAddContainer, StyledContent } from './MainAdd.styles'
import { FormSection } from '../../components/FormSection/FormSection'
import { messageResponse } from '../../helpers/messageResponse'

const stepsItemsTemplate = [
    {
        title: 'Zapis do bazy danych',
        status: 'finish',
        description: 'Zapisano dane do bazy',
    },
    {
        title: 'Tworzenie koszulki w EZD',
        status: 'finish',
        description: 'Wystąpił problem przy tworzeniu koszulki',
    },
    // {
    //     title: 'Tworzenie koszulki w EZD',
    //     status: 'finish',
    //     description: 'Wystąpił problem przy tworzeniu koszulki',
    // },
    // {
    //     title: 'Tworzenie koszulki w EZD',
    //     status: 'error',
    //     description: 'Wystąpił problem przy tworzeniu koszulki',
    // },
    // {
    //     title: 'Zapis do bazy danych',
    //     status: 'finish',
    //     description: 'Zapisano dane do bazy',
    // },
]

export const MainAdd = () => {
    const navigate = useNavigate()
    const [messageApi, messageContextHolder] = message.useMessage()
    const [notificationApi, notificationContextHolder] =
        notification.useNotification()
    const [loading, setLoading] = useState(false)
    const [stepsItems, setStepsItems] = useState()
    const [formDisabled, setFormDisabled] = useState(false)

    setTimeout(() => {
        setStepsItems()
    }, 3000)

    //From failed
    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 6)
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

        setLoading(true)
        setFormDisabled(true)
        console.log('Success:', payload)

        WP_Instance.post('/udo/v1/addDataRequest', payload)
            .then((response) => {
                console.log(response)
                setLoading(false)
                setStepsItems(response?.data)
                messageApi.success(messageResponse(response?.data), 4, () =>
                    setFormDisabled(false)
                )
            })
            .catch((error) => {
                setLoading(false)
                messageApi.error(error.message, 4, () => setFormDisabled(false))
                console.log(error)
            })
    }

    //Show message when one of all api response has error
    const onApiFetchErrorOpenNotification = () => {
        const key = `open${Date.now()}`
        const btn = (
            <Space>
                <Button type="primary" onClick={() => navigate(0)}>
                    Odśwież stronę
                </Button>
            </Space>
        )

        notificationApi.error({
            message: 'UPS! Wystąpił błąd',
            description:
                'Wystąpił błąd podczas pobierania danych formularza, przeładuj stronę i spróbuj ponownie. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony',
            btn,
            key,
            closeIcon: false,
            duration: 0,
        })
    }

    return (
        <>
            {messageContextHolder}
            {notificationContextHolder}
            <MainAddContainer>
                <StyledContent>
                    <AddForm
                        onSubmit={onSubmit}
                        onFinishFailed={onFinishFailed}
                        loading={loading}
                        formDisabled={formDisabled}
                        // initialValues={{}}
                    />
                    <button onClick={onApiFetchErrorOpenNotification} />
                    {stepsItems && (
                        <FormSection sectionName="Rezultat zapisu">
                            <StepsView stepsItems={stepsItems} />
                        </FormSection>
                    )}
                </StyledContent>
            </MainAddContainer>
        </>
    )
}
