import { Table, Space, Tag, Button } from 'antd'
import {
    CheckCircleOutlined,
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { PageTitleHeader } from '../../components/PageTitleHeader/PageTitleHeader'
import { useState, useEffect } from 'react'
import WP_Instance from '../../services/WP_Instance'
import { newDataTableWithKey } from '../../helpers/newDataTableWithKey'
import { TableRowDescription } from '../../components/TableRowDescription/TableRowDescription'

const ShowTableStatusTags = ({ finished_status = 0 }) => {
    return (
        <Space>
            {finished_status && finished_status ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    zakończono
                </Tag>
            ) : (
                <Tag icon={<SyncOutlined />} color="processing">
                    w trakcie
                </Tag>
            )}
            <Tag icon={<CheckCircleOutlined />} color="warning">
                Ważne
            </Tag>
        </Space>
    )
}

export const ShowActionButtons = ({}) => {
    return (
        <Space>
            <Button type="primary" icon={<EditOutlined />} />

            <Button>Zakończ</Button>
            <Button type="primary" danger icon={<DeleteOutlined />} />
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
        title: 'Nr sprawy',
        dataIndex: 'nr_sprawy',
        key: 'nr_sprawy',
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
        render: (_, record) => <ShowActionButtons />,
    },
]

export const RecordsView = () => {
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

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
        </>
    )
}
