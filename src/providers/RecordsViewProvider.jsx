import { useState, useEffect, createContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { message } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { newDataTableWithKey } from '@helpers/newDataTableWithKey'

export const RecordsViewContext = createContext({
    onFiltersChange: () => {},
})

export const RecordsViewProvider = ({ children }) => {
    const [currentRecordId, setCurrentRecordId] = useState(null)
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [messageApi, messageContextHolder] = message.useMessage()
    const initialSearchParams = { page: 1, per_page: 10, search_query: '' }
    const [searchParams, setSearchParams] = useSearchParams(initialSearchParams)
    const currentPage = searchParams.get('page')
    const perPage = searchParams.get('per_page')

    useEffect(() => {
        if (searchParams) {
            setIsLoading(true)
            WP_Instance.get(`/udo/v1/getDataRequestList?${searchParams}`)
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
        }
    }, [searchParams])

    const showMessage = (text, type, onClose) => {
        switch (type) {
            case 'loading':
                messageApi.loading({
                    key: 'loading',
                    content: text,
                    duration: 0,
                })
                break
            case 'success':
                messageApi.success({
                    content: text,
                    duration: 3,
                    onClose: onClose,
                })
                break
            case 'error':
                messageApi.error({
                    content: text,
                    onClose: onClose,
                })
                break
            default:
                break
        }
    }

    const ezdAction = (id, type) => {
        let actionType = {
            endpoint: '',
            loadingText: '',
            successText: '',
            errorText: '',
        }

        switch (type) {
            case 'koszulka':
                actionType = {
                    ...actionType,
                    endpoint: 'redoCreateKoszulka',
                    loadingText: 'Tworzenie koszulki...',
                    successText: 'Koszulka została utworzona w EZD!',
                    errorText:
                        'Wystąpił błąd przy tworzeniu koszulki, prosimy spróbować później...',
                }
                break
            case 'sprawa':
                actionType = {
                    ...actionType,
                    endpoint: 'redoCreateSprawa',
                    loadingText: 'Tworzenie sprawy...',
                    successText: 'Sprawa została utworzona w EZD!',
                    errorText:
                        'Wystąpił błąd przy tworzeniu sprawy, prosimy spróbować później...',
                }
                break
            default:
                actionType
        }

        if (id > 0) {
            showMessage(actionType.loadingText, 'loading')
            WP_Instance.put(
                `/udo/v1/${actionType.endpoint}?data_request_id=${id}`
            )
                .then(({ data }) => {
                    messageApi.destroy('loading')
                    showMessage(data?.description, 'success')
                })
                .catch((error) => {
                    if (error.response) {
                        messageApi.destroy('loading')
                        showMessage(error?.response?.data.description, 'error')
                    } else {
                        messageApi.destroy('loading')
                        showMessage(
                            'Wystąpił błąd, prosimy spróbować później',
                            'error'
                        )
                    }
                })
        }
    }

    const onFiltersChange = (changedFields) => {
        setSearchParams((searchParams) => {
            searchParams.set('page', 1)
            for (const [key, value] of Object.entries(changedFields)) {
                searchParams.set(key, value)
            }
            return searchParams
        })
    }
    // const onFiltersChange = (a) => {
    //     console.log(a)
    // }

    const onPaginationChange = (currentPage, pageSize) => {
        setSearchParams((searchParams) => {
            searchParams.set('page', currentPage)
            searchParams.set('per_page', pageSize)
            return searchParams
        })
    }

    return (
        <RecordsViewContext.Provider
            value={{
                isLoading,
                tableData,
                total,
                currentRecordId,
                setCurrentRecordId,
                ezdAction,
                currentPage,
                perPage,
                searchParams,
                setSearchParams,
                onFiltersChange,
                onPaginationChange,
            }}
        >
            {messageContextHolder}
            {children}
        </RecordsViewContext.Provider>
    )
}
