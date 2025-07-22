import { useState, createContext } from 'react'

export const SecondDrawerContext = createContext()

const controller = new AbortController()

export const SecondDrawerProvider = ({ children }) => {
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(false)

    const openSecondDrawer = () => {
        setIsSecondDrawerVisible(true)
    }

    const closeSecondDrawer = () => {
        setIsSecondDrawerVisible(false)
    }

    return (
        <SecondDrawerContext.Provider
            value={{
                isSecondDrawerVisible,
                controller,
                openSecondDrawer,
                closeSecondDrawer,
            }}
        >
            {children}
        </SecondDrawerContext.Provider>
    )
}
