import { message, notification, Alert } from 'antd'
import { useState } from 'react'
import WP_Instance from '../../services/WP_Instance'
import { AddForm } from '../../components/AddForm/AddForm'
import { StepsView } from '../../components/StepsView/Steps'
import { FormSection } from '../../components/FormSection/FormSection'
import { messageResponse } from '../../helpers/messageResponse'
import { PageTitleHeader } from '../../components/PageTitleHeader/PageTitleHeader'
import { useTheme } from 'styled-components'
// const stepsItemsTemplate = [
//     {
//         title: 'Zapis do bazy danych',
//         status: 'finish',
//         description: 'Zapisano dane do bazy',
//     },
//     {
//         title: 'Tworzenie koszulki w EZD',
//         status: 'finish',
//         description: 'Wystąpił problem przy tworzeniu koszulki',
//     },
//     // {
//     //     title: 'Tworzenie koszulki w EZD',
//     //     status: 'finish',
//     //     description: 'Wystąpił problem przy tworzeniu koszulki',
//     // },
//     // {
//     //     title: 'Tworzenie koszulki w EZD',
//     //     status: 'error',
//     //     description: 'Wystąpił problem przy tworzeniu koszulki',
//     // },
//     // {
//     //     title: 'Zapis do bazy danych',
//     //     status: 'finish',
//     //     description: 'Zapisano dane do bazy',
//     // },
// ]

export const MainAdd = () => {
    const [messageApi, messageContextHolder] = message.useMessage()
    const [notificationApi, notificationContextHolder] =
        notification.useNotification()
    const [loading, setLoading] = useState(false)
    const [stepsItems, setStepsItems] = useState()
    const [formDisabled, setFormDisabled] = useState(false)
    const [error, setError] = useState(false)
    const { colors } = useTheme()

    // setTimeout(() => {
    //     setStepsItems()
    // }, 3000)

    //Form failed
    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola', 6)
        notificationApi.error({
            message: 'Poczekaj',
            description: 'Musisz wypełnić wszystkie wymagane pola',
            onClose: () => setFormDisabled(false),
        })
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
                // messageApi.error(error.resp.message, 4, () =>
                //     setFormDisabled(false)
                // )
                // notificationApi.error({
                //     description: 'Błąd',
                //     message: 'asfasfas',
                //     onClose: () => setFormDisabled(false),
                // })
                // console.log(error)

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    messageApi.error(error.response?.data?.message, 4, () =>
                        setFormDisabled(false)
                    )

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
            {notificationContextHolder}
            {error && (
                <Alert
                    message="Ups! Wystąpił błąd"
                    description="Podczas pobierania danych formularza wystapił błąd, spróbuj przeładować stronę naciskając przyciski CTRL + F5. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony."
                    type="error"
                    showIcon
                />
            )}
            <PageTitleHeader
                title="Zarejestruj zapytanie"
                backgroundColor={colors.color_card_1}
            />
            <AddForm
                onSubmit={onSubmit}
                onFinishFailed={onFinishFailed}
                loading={loading}
                formDisabled={formDisabled}
                setError={setError}
            />
            {stepsItems && (
                <FormSection sectionName="Rezultat zapisu">
                    <StepsView stepsItems={stepsItems} />
                </FormSection>
            )}
        </>
    )
}
