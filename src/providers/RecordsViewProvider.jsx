import { useState, useEffect, createContext } from 'react'
import WP_Instance from '@services/WP_Instance'
import { newDataTableWithKey } from '@helpers/newDataTableWithKey'

export const RecordsViewContext = createContext({})

export const RecordsViewProvider = ({ children }) => {
    const [currentRecordId, setCurrentRecordId] = useState(null)
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    console.log(currentRecordId)

    useEffect(() => {
        setIsLoading(true)
        WP_Instance.get(
            `/udo/v1/getDataRequestList?page=${currentPage}&per_page=${pageSize}`
        )
            .then((response) => {
                setTableData(newDataTableWithKey(response?.data?.data))
                setTotal(response?.data?.total)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [currentPage, pageSize])

    return (
        <RecordsViewContext.Provider
            value={{
                isLoading,
                tableData,
                currentPage,
                pageSize,
                total,
                setCurrentPage,
                setPageSize,
                currentRecordId,
                setCurrentRecordId,
            }}
        >
            {children}
        </RecordsViewContext.Provider>
    )
}
