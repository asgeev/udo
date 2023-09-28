import { useState, createContext, useEffect } from 'react'
import WP_Instance from '@services/WP_Instance'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const SecondDrawerContext = createContext({
    drawerData: undefined,
    drawerLoading: false,
    fetchDataForSecondDrawer: () => {},
})

const initialState = {
    isSecondDrawerVisible: false,
    apiId: undefined,
    drawerData: undefined,
    error: {
        state: false,
        message: 'Wystąpił błąd, prosimy spróbować później',
    },
    isDrawerLoading: true,
}

export const SecondDrawerProvider = ({ children }) => {
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(
        initialState.isSecondDrawerVisible
    )
    const [apiId, setApiId] = useState(initialState.apiId)
    const [drawerData, setDrawerData] = useState(initialState.drawerData)
    const [error, setError] = useState(initialState.error)
    const [isDrawerLoading, setIsDrawerLoading] = useState(
        initialState.isDrawerLoading
    )
    const { currentRecordId } = useRecordsViewContext()

    useEffect(() => {}, [currentRecordId])

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
        setInitalState()
    }

    const fetchDataForSecondDrawer = async () => {
        if (apiId) {
            try {
                const response = await WP_Instance.get(
                    `/udo/v1/apiCall?data_request_id=${currentRecordId}&api_id=${apiId}`
                )
                console.log(response)

                setDrawerData(response.data.data)
                setIsDrawerLoading(false)
            } catch (err) {
                console.error(err)
                if (err.response) {
                    setError({
                        ...error,
                        state: true,
                        message: err.response.data[0]?.description,
                    })
                } else {
                    setError({
                        ...error,
                        state: true,
                    })
                }

                setIsDrawerLoading(false)
            }
        }
    }

    const setInitalState = () => {
        setIsSecondDrawerVisible(initialState.isSecondDrawerVisible)
        setApiId(initialState.apiId)
        setError(initialState.error)
        setDrawerData(initialState.drawerData)
        setIsDrawerLoading(initialState.isDrawerLoading)
    }

    return (
        <SecondDrawerContext.Provider
            value={{
                apiId,
                error,
                isSecondDrawerVisible,
                isDrawerLoading,
                drawerData,
                openSecondDrawer,
                closeSecondDrawer,
                fetchDataForSecondDrawer,
                setInitalState,
            }}
        >
            {children}
        </SecondDrawerContext.Provider>
    )
}
