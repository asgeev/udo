import { useState, createContext } from 'react'

export const DrawersContext = createContext({})

export const DrawersProvider = ({ children }) => {
    const [isFirstDrawerVisible, setIsFirstDrawerVisible] = useState(null)
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(false)

    const openDrawer = () => {
        setIsFirstDrawerVisible(true)
    }

    const closeDrawer = () => {
        setIsFirstDrawerVisible(false)
    }

    const openSecondDrawer = () => {
        setIsSecondDrawerVisible(true)
    }

    const closeSecondDrawer = () => {
        setIsSecondDrawerVisible(false)
    }

    return (
        <DrawersContext.Provider
            value={{
                isFirstDrawerVisible,
                openDrawer,
                closeDrawer,
                isSecondDrawerVisible,
                openSecondDrawer,
                closeSecondDrawer,
            }}
        >
            {children}
        </DrawersContext.Provider>
    )
}
