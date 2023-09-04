import { useState, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { newDataTableWithKey } from '@helpers/newDataTableWithKey'
import { TableRowDescription } from '@atoms/TableRowDescription/TableRowDescription'
import { TableActionButtons } from '@atoms/TableActionButtons/TableActionButtons'
import { EditFormDrawer } from '@molecules/EditFormDrawer/EditFormDrawer'
import { ShowTableStatusTags } from '@atoms/ShowTableStatusTags/ShowTableStatusTags'

export const RecordsView = () => {
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [recordId, setRecordId] = useState(null)
    let location = useLocation()
    const navigate = useNavigate()
    // const recordIdFromLink = location.state?.recordId

    const columns = [
        {
            title: 'Id',
            dataIndex: 'data_request_id',
            key: 'data_request_id',
        },
        {
            title: 'Pesel',
            dataIndex: 'pesel',
            key: 'pesel',
        },
        {
            title: 'Imię',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Nazwisko',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'RPW',
            dataIndex: 'rpw',
            key: 'rpw',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'nr_sprawy',
            render: (_, record) => <ShowTableStatusTags record={record} />,
        },
        {
            title: 'Akcja',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <TableActionButtons
                    showDrawer={showDrawer}
                    recordId={record.key}
                />
            ),
        },
    ]

    const showDrawer = (recordId) => {
        setDrawerOpen(true)
        setRecordId(recordId)
    }
    const onDrawerClose = () => {
        setDrawerOpen(false)
        // navigate(location.pathname, {})
    }

    // useEffect(() => {
    //     console.log(recordIdFromLink)
    //     if (recordIdFromLink) {
    //         showDrawer(recordIdFromLink)
    //     }
    // }, [recordIdFromLink])

    useLayoutEffect(() => {
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
        <>
            <PageTitleHeader title="Podgląd zapisanych spraw" />
            <Table
                loading={isLoading}
                dataSource={tableData}
                columns={columns}
                showDrawer={showDrawer}
                expandable={{
                    expandedRowRender: (record) => {
                        return <TableRowDescription data={record} />
                    },
                }}
                size="medium"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    onChange: (page) => {
                        setCurrentPage(page)
                    },
                    onShowSizeChange: (current, size) => {
                        setPageSize(size)
                    },
                }}
            />
            <EditFormDrawer
                recordId={recordId}
                drawerOpen={drawerOpen}
                onDrawerClose={onDrawerClose}
            />
        </>
    )
}
