import { useState, createContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { message } from 'antd'
import { useGetTableData } from '@hooks/useGetTableData'
import { useEzdMutation } from '@hooks/useEzdMutation'

export const RecordsViewContext = createContext({
    data: [],
    isLoading: false,
    currentRecordId: null,
    setCurrentRecordId: () => {},
    ezdAction: () => {},
    currentPage: null,
    perPage: null,
    searchParams: null,
    onFiltersChange: () => {},
    onPaginationChange: () => {},
})

export const RecordsViewProvider = ({ children }) => {
    const [currentRecordId, setCurrentRecordId] = useState(null)
    const [messageApi, messageContextHolder] = message.useMessage()
    const initialSearchParams = { page: 1, per_page: 10, search_query: '' }
    const [searchParams, setSearchParams] = useSearchParams(initialSearchParams)
    const currentPage = searchParams.get('page')
    const perPage = searchParams.get('per_page')

    //Fetch data with search parameters for table
    const { data, isLoading } = useGetTableData(searchParams)
    //Ezd redoCreateKoszulka and redoCreateSprawa
    const { mutateAsync } = useEzdMutation()

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

    const ezdAction = async (id, type) => {
        let actionType = {
            endpoint: '',
            loadingText: '',
            successText: '',
            errorText: '',
        }
        //For add more interaction with ezd add next case
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
        //Ezd action requests
        if (id && id > 0) {
            showMessage(actionType.loadingText, 'loading')
            try {
                const { data } = await mutateAsync({ id, actionType })
                showMessage(data?.description, 'success')
            } catch (error) {
                if (error.response) {
                    showMessage(error?.response?.data?.description, 'error')
                } else {
                    showMessage(
                        'Wystąpił błąd, prosimy spróbować później',
                        'error'
                    )
                }
            } finally {
                messageApi.destroy('loading')
            }
        } else {
            messageApi.error(
                'Wystąpił nieoczekiwany błąd, prosimy spróbować później'
            )
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
                data,
                isLoading,
                currentRecordId,
                setCurrentRecordId,
                ezdAction,
                currentPage,
                perPage,
                searchParams,
                onFiltersChange,
                onPaginationChange,
            }}
        >
            {messageContextHolder}
            {children}
        </RecordsViewContext.Provider>
    )
}
