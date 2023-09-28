import { useState, createContext } from 'react'

export const FirstDrawerContext = createContext({})

export const FirstDrawerProvider = ({ children }) => {
    const [isFirstDrawerVisible, setIsFirstDrawerVisible] = useState(null)
    const [isFormChanged, setIsFormChanged] = useState(false)

    const openDrawer = () => {
        setIsFirstDrawerVisible(true)
    }

    const closeDrawer = () => {
        setIsFirstDrawerVisible(false)
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
