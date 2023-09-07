import { Table } from 'antd'
import { TableRowDescription } from '@atoms/TableRowDescription/TableRowDescription'
import { useEditDrawerContext } from '@hooks/useEditDrawerContext'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { ShowTableStatusTags } from '@atoms/ShowTableStatusTags/ShowTableStatusTags'
import { TableActionButtons } from '@atoms/TableActionButtons/TableActionButtons'

export const RecordsViewTable = () => {
    const { openDrawer } = useEditDrawerContext()
    const {
        isLoading,
        total,
        tableData,
        showDrawer,
        currentPage,
        pageSize,
        setCurrentPage,
        setPageSize,
        setCurrentRecordId,
        ezdAction,
    } = useRecordsViewContext()

    const columns = [
        {
            title: 'Id',
            dataIndex: 'data_request_id',
            key: 'data_request_id',
            width: 60,
        },
        {
            title: 'Imię',
            dataIndex: 'first_name',
            key: 'first_name',
            ellipsis: true,
        },
        {
            title: 'Nazwisko',
            dataIndex: 'last_name',
            key: 'last_name',
            ellipsis: true,
        },
        {
            title: 'Wnioskodawca',
            dataIndex: 'requestor_name',
            key: 'requestor_name',
            ellipsis: true,
        },
        {
            title: 'Data końca realizacji',
            dataIndex: 'max_finish_date',
            key: 'max_finish_date',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render: (_, record) => <ShowTableStatusTags record={record} />,
        },
        {
            title: 'Akcja',
            dataIndex: 'action',
            key: 'action',
            width: 180,
            render: (_, record) => (
                <TableActionButtons
                    record={record}
                    openDrawer={openDrawer}
                    setCurrentRecordId={setCurrentRecordId}
                    ezdAction={ezdAction}
                />
            ),
        },
    ]
    return (
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
    )
}
