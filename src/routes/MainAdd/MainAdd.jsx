import { message } from 'antd'
import { useState } from 'react'
import WP_Instance from '../../services/WP_Instance'
import { AddForm } from '../../components/AddForm/AddForm'
import { StepsView } from '../../components/StepsView/Steps'
import { MainAddContainer, StyledContent } from './MainAdd.styles'
import { FormSection } from '../../components/FormSection/FormSection'
import { messageResponse } from '../../helpers/messageResponse'

const onSelect = (data) => {
    console.log('onSelect', data)
}

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
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)
    const [stepsItems, setStepsItems] = useState(null)

    // setTimeout(() => {
    //     setStepsItems(stepsItemsTemplate)
    // }, 3000)

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
        console.log('Success:', payload)

        WP_Instance.post('/udo/v1/addDataRequest', payload)
            .then((response) => {
                console.log(response)
                setLoading(false)
                setStepsItems(response?.data)
                messageApi.success(messageResponse(response?.data))
            })
            .catch((error) => {
                setLoading(false)
                messageApi.error(
                    'UPS! Nie udało nam się zapisać danych, spróbuj ponownie później'
                )
                console.log(error)
            })
    }

    // const onSubmit = (values) => {
    //     const newValues = {
    //         ...values,
    //         inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
    //         birth_date: values['birth_date']?.format('YYYY-MM-DD'),
    //         max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
    //     }

    //     console.log('Success:', newValues)

    //     messageApi.success(messageResponse(stepsItemsTemplate), 6)
    // }
    return (
        <>
            {contextHolder}
            <MainAddContainer>
                <StyledContent>
                    <AddForm
                        onSubmit={onSubmit}
                        onFinishFailed={onFinishFailed}
                        loading={loading}
                        onSelect={onSelect}
                    />
                    {stepsItems && (
                        <FormSection sectionName="Rezultat zapisu">
                            <StepsView
                                // style={{ minWidth: 400, maxWidth: 800, width: '100%' }}
                                stepsItems={stepsItems}
                            />
                        </FormSection>
                    )}
                </StyledContent>
            </MainAddContainer>
        </>
    )
}
