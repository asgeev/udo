import { Space, Tooltip, Button, Badge } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    NodeExpandOutlined,
    SisternodeOutlined,
} from '@ant-design/icons'

export const TableActionButtons = ({
    record,
    openDrawer,
    setCurrentRecordId,
    ezdAction,
}) => {
    return (
        <Space size={0}>
            <Tooltip title="Edytuj" color="blue">
                <Button
                    onClick={() => {
                        setCurrentRecordId(record?.key)
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

            {!record?.koszulka_id && (
                <Badge dot>
                    <Tooltip
                        title="Spróbuj ponownie utworzyć koszulkę"
                        color="purple"
                    >
                        <Button
                            type="text"
                            icon={<SisternodeOutlined />}
                            onClick={() => ezdAction(record?.key, 'koszulka')}
                        />
                    </Tooltip>
                </Badge>
            )}
            {!record?.nr_sprawy && (
                <Badge dot>
                    <Tooltip
                        title="Spróbuj ponownie utworzyć sprawę"
                        color="magenta"
                    >
                        <Button
                            type="text"
                            disabled={record?.koszulka_id ? false : true}
                            icon={<NodeExpandOutlined />}
                            onClick={() => ezdAction(record?.key, 'sprawa')}
                        />
                    </Tooltip>
                </Badge>
            )}
        </Space>
    )
}
