import { useState, createContext } from 'react'

export const SecondDrawerContext = createContext({
    drawerData: undefined,
    drawerLoading: false,
    fetchDataForSecondDrawer: () => {},
})

const initialState = {
    isSecondDrawerVisible: false,
    apiId: undefined,
}

const controller = new AbortController()

export const SecondDrawerProvider = ({ children }) => {
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(
        initialState.isSecondDrawerVisible
    )
    const [apiId, setApiId] = useState(initialState.apiId)

    const openSecondDrawer = (apiId) => {
        if (apiId && apiId > 0) {
            setIsSecondDrawerVisible(true)
            setApiId(apiId)
        } else {
            console.error(`Required apiId is not recognized: ${apiId}`)
        }
    }

    const closeSecondDrawer = () => {
        setIsSecondDrawerVisible(false)
    }

    return (
        <SecondDrawerContext.Provider
            value={{
                apiId,
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
