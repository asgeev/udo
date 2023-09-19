import { useState, useEffect, createContext } from 'react'
import WP_Instance from '@services/WP_Instance'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const SecondDrawerContext = createContext({
    drawerData: null,
    drawerLoading: false,
    fetchDataForSecondDrawer: () => {},
})

export const SecondDrawerProvider = ({ children }) => {
    const [apiId, setApiId] = useState(null)
    const [drawerData, setDrawerData] = useState(null)
    const [isDrawerLoading, setIsDrawerLoading] = useState(true)
    const { currentRecordId } = useRecordsViewContext()

    const fetchDataForSecondDrawer = () => {
        if (apiId) {
            WP_Instance.get(
                `/udo/v1/apiCall?data_request_id=${currentRecordId}&api_id=${apiId}`
            )
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setIsDrawerLoading(false)
                })
        }
    }

    return (
        <SecondDrawerContext.Provider
            value={{ fetchDataForSecondDrawer, isDrawerLoading }}
        >
            {children}
        </SecondDrawerContext.Provider>
    )
}
