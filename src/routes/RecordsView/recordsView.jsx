import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Table, Space, Tag, Button, Tooltip } from 'antd'
import {
    CheckCircleOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    CloudDownloadOutlined,
} from '@ant-design/icons'
import WP_Instance from '../../services/WP_Instance'
import { PageTitleHeader } from '../../components/PageTitleHeader/PageTitleHeader'
import { newDataTableWithKey } from '../../helpers/newDataTableWithKey'
import { TableRowDescription } from '../../components/TableRowDescription/TableRowDescription'
import { downloadFile } from '../../helpers/downloadFile'
import { EditFormDrawer } from '../../components/EditFormDrawer/EditFormDrawer'

const ShowTableStatusTags = ({ finished_status = 0 }) => {
    return (
        <Space>
            {finished_status ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    zakończono
                </Tag>
            ) : (
                <Tag icon={<SyncOutlined />} color="processing">
                    w trakcie
                </Tag>
            )}
            <Tag color="red">pilne</Tag>
        </Space>
    )
}

export const TableActionButtons = ({ id }) => {
    const handleDownloadFile = (id) => {
        const filename = `${id} Odpowiedż do wnioskodawcy`
        downloadFile(id, filename)
    }

    return (
        <Space>
            <Tooltip title="Edytuj" color="blue">
                <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => console.log('Clicked edit button')}
                />
            </Tooltip>
            <Tooltip title="Usuń" color="red">
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => console.log('Clicked delete button')}
                />
            </Tooltip>
            <Tooltip title=".docx">
                <Button
                    type="text"
                    icon={<CloudDownloadOutlined />}
                    onClick={() => handleDownloadFile(id)}
                    // href={}
                />
            </Tooltip>
        </Space>
    )
}

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
        render: (_, record) => <TableActionButtons id={record.key} />,
    },
]

export const RecordsView = () => {
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(false)
    let { state } = useLocation()
    const recordId = state?.recordId

    const showDrawer = () => {
        setDrawerOpen(true)
    }
    const onDrawerClose = () => {
        setDrawerOpen(false)
    }
    useEffect(() => {
        if (recordId) {
            showDrawer()
        }
    }, [recordId])

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
        <>
            <Button type="primary" onClick={showDrawer}>
                open edit drawer
            </Button>
            <PageTitleHeader title="Podgląd zapisanych spraw" />
            <Table
                loading={isLoading}
                dataSource={tableData}
                columns={columns}
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
                open={drawerOpen}
                onDrawerClose={onDrawerClose}
            />
        </>
    )
}
