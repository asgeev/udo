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
    } = useRecordsViewContext()

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
            render: (_, record) => <ShowTableStatusTags />,
        },
        {
            title: 'Akcja',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <TableActionButtons
                    recordId={record.key}
                    openDrawer={openDrawer}
                    setCurrentRecordId={setCurrentRecordId}
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
