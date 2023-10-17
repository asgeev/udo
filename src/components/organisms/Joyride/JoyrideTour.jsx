import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Typography } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
const { Text, Paragraph, Title } = Typography

const StepContent = ({ children, title }) => {
    return (
        <>
            <div style={{ textAlign: 'left' }}>
                <Title level={4}>{title}</Title>
                {children}
            </div>
        </>
    )
}

const state = {
    steps: {
        addPage: [
            {
                target: 'body',
                content:
                    'Witaj w przewodniku, zaraz przeprowadzimy Cię przez najważniejsze funkcjonalności aplikacji. Jeżeli wiesz już jak używać aplikacji po prostu zamknij to okno. Jeżeli jednak nadal chcesz przejść dalej kliknij przycisk dalej.',
                placement: 'center',
            },
            {
                target: '#userStatistic',
                content:
                    'Tu w przyszłości będą pojawiały się statystyki dotyczące Twojej pracy. Dzięki nim będziesz mógł/mogła na bierząco monitorować status swojej pracy.',
            },
            {
                target: '.ant-layout-sider-trigger',
                content:
                    'Dajemy Ci możliwość uzyskania większej przestrzeni roboczej. Wystarczy, że naciśniesz ten przycisk! ',
            },
            {
                target: 'body',
                placement: 'center',
                content: (
                    <StepContent title="Pozaj super moce aplikacji!">
                        <Paragraph>
                            Jedną z super mocy tej aplikacji to możliwość
                            pobierania metadanych prosto z EZD.
                        </Paragraph>
                    </StepContent>
                ),
            },
            {
                target: '#formItemInfowKoszulkaId',
                content: (
                    <StepContent title="Numer koszulki">
                        <Paragraph>
                            Jedną z super mocy tej aplikacji to możliwość
                            pobierania metadanych prosto z EZD.
                        </Paragraph>
                    </StepContent>
                ),
            },
            {
                target: '#inputInflowKoszulkaId',
                content: (
                    <StepContent title="Numer koszulki">
                        <Paragraph>Po prostu wpisz numer koszulki</Paragraph>
                    </StepContent>
                ),
            },

            {
                target: '#getMetaDataFromEzdButton',
                content:
                    'Następnie, naciśnij ten przycisk, aby pobrać dane z EZD, to wszystko! Dane zostaną pobrane z EZD i wstawione do formularza, super prawda!?',
            },
            {
                target: '#mainAddForm',
                content: 'Uzupełnij pozostałe wymagane pola w formularzu...',
                placement: 'center',
            },
            {
                target: '#saveAddFrom',
                content:
                    '...naciśnij przycik ZAPISZ SZABLON. Gratulacje 🎉 udało Ci się zapisać sprawę. Teraz możesz przejść do PODGLĄDU i edytować swoją sprawę.',
                placement: 'auto',
            },
        ],
        recordsView: [
            {
                target: '.filtersForm_my',
                content:
                    'Następnie, naciśnij ten przycisk, aby pobrać dane z EZD, to wszystko! Dane zostaną pobrane z EZD i wstawione do formularza, super prawda!?',
            },
            {
                target: '#mainAddForm',
                content: 'Uzupełnij pozostałe wymagane pola w formularzu...',
                placement: 'center',
            },
            {
                target: '#saveAddFrom',
                content:
                    '...naciśnij przycik ZAPISZ SZABLON. Gratulacje 🎉 udało Ci się zapisać sprawę. Teraz możesz przejść do PODGLĄDU i edytować swoją sprawę.',
                placement: 'auto',
            },
        ],
    },
}

const styles = {
    arrowColor: '#fff',
    backgroundColor: '#fff',
    beaconSize: 36,
    primaryColor: '#1677ff',
    width: '520px',
    zIndex: 100,
}

export const JoyrideTour = () => {
    const [steps, setSteps] = useState(state.steps.addPage)
    let location = useLocation()

    useEffect(() => {
        if (location.pathname === '/dodawanie') {
            setSteps(state.steps.addPage)
        }

        if (location.pathname === '/podglad') {
            setSteps(state.steps.recordsView)
        } else {
            setSteps([])
        }
    }, [location])

    return (
        <Joyride
            steps={steps}
            continuous
            debug
            disableCloseOnEsc
            disableOverlayClose
            styles={{ options: styles }}
        />
    )
}
