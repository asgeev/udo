import { useState, createContext } from 'react'

export const EditDrawerContext = createContext({})

export const EditDrawerProvider = ({ children }) => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(null)
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(false)

    const openDrawer = () => {
        setIsDrawerVisible(true)
    }

    const closeDrawer = () => {
        setIsDrawerVisible(false)
    }

    const openSecondDrawer = () => {
        setIsSecondDrawerVisible(true)
    }

    const closeSecondDrawer = () => {
        setIsSecondDrawerVisible(false)
    }

    return (
        <EditDrawerContext.Provider
            value={{
                isDrawerVisible,
                openDrawer,
                closeDrawer,
                isSecondDrawerVisible,
                openSecondDrawer,
                closeSecondDrawer,
            }}
        >
            {children}
        </EditDrawerContext.Provider>
    )
}
