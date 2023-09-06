import { Space, Tooltip, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const TableActionButtons = ({
    recordId,
    openDrawer,
    setCurrentRecordId,
}) => {
    return (
        <Space>
            <Tooltip title="Edytuj" color="blue">
                <Button
                    onClick={() => {
                        setCurrentRecordId(recordId)
                        openDrawer()
                    }}
                    type="text"
                    icon={<EditOutlined />}
                />
            </Tooltip>
            <Tooltip title="Usuń" color="red">
                <Button
                    type="text"
                    danger
                    disabled
                    icon={<DeleteOutlined />}
                    onClick={() => console.log('Clicked delete button')}
                />
            </Tooltip>
        </Space>
    )
}
