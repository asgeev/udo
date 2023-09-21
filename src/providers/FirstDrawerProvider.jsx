import { useState, createContext } from 'react'

export const FirstDrawerContext = createContext({})

export const FirstDrawerProvider = ({ children }) => {
    const [isFirstDrawerVisible, setIsFirstDrawerVisible] = useState(null)

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
                openDrawer,
                closeDrawer,
            }}
        >
            {children}
        </FirstDrawerContext.Provider>
    )
}
