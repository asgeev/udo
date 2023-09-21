import { useState, useEffect, createContext } from 'react'
import WP_Instance from '@services/WP_Instance'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const SecondDrawerContext = createContext({
    drawerData: null,
    drawerLoading: false,
    fetchDataForSecondDrawer: () => {},
})

export const SecondDrawerProvider = ({ children }) => {
    const [isSecondDrawerVisible, setIsSecondDrawerVisible] = useState(false)
    const [apiId, setApiId] = useState(null)
    const [drawerData, setDrawerData] = useState(null)
    const [error, setError] = useState(null)
    const [isDrawerLoading, setIsDrawerLoading] = useState(false)
    const { currentRecordId } = useRecordsViewContext()

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
        setApiId(null)
        setError(null)
        setDrawerData(null)
    }

    const fetchDataForSecondDrawer = () => {
        if (apiId) {
            setIsDrawerLoading(true)
            WP_Instance.get(`/udo/v1/apiCall?data_request_id=4&api_id=${apiId}`)
                .then((response) => {
                    console.log(response)
                    setDrawerData(response.data.data)
                    setIsDrawerLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setError(error.message)
                    setIsDrawerLoading(false)
                })
        }
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
            }}
        >
            {children}
        </SecondDrawerContext.Provider>
    )
}
