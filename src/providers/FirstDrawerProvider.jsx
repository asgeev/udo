import { useState, createContext } from 'react'
import { Modal } from 'antd'

export const FirstDrawerContext = createContext({})

export const FirstDrawerProvider = ({ children }) => {
    const [isFirstDrawerVisible, setIsFirstDrawerVisible] = useState(null)
    const [isFormChanged, setIsFormChanged] = useState(false)
    const { confirm } = Modal

    window.onbeforeunload = () => {
        if (isFormChanged) {
            return 'Na pewno chcesz odświeżyć? Wprowadzone zmiany nie zostaną zapisane!'
        } else {
            return null
        }
    }

    const showCloseConfirm = () => {
        confirm({
            title: 'Zaczekaj!',
            content: 'Czy na pewno chcesz wyjść bez zapisywania!?',
            destroyOnClose: true,
            okText: 'Wyjdź',
            onOk() {
                setIsFirstDrawerVisible(false)
                setIsFormChanged(false)
            },
        })
    }

    const openDrawer = () => {
        setIsFirstDrawerVisible(true)
    }

    const closeDrawer = () => {
        isFormChanged ? showCloseConfirm() : setIsFirstDrawerVisible(false)
    }

    return (
        <FirstDrawerContext.Provider
            value={{
                isFirstDrawerVisible,
                isFormChanged,
                openDrawer,
                closeDrawer,
                setIsFormChanged,
            }}
        >
            {children}
        </FirstDrawerContext.Provider>
    )
}
