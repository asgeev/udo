import { Space, Tooltip, Button } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    CloudDownloadOutlined,
} from '@ant-design/icons'

export const TableActionButtons = ({ recordId, showDrawer }) => {
    return (
        <Space>
            <Tooltip title="Edytuj" color="blue">
                <Button
                    onClick={() => showDrawer(recordId)}
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
            <Tooltip title=".docx">
                <Button type="text" icon={<CloudDownloadOutlined />} />
            </Tooltip>
        </Space>
    )
}
