import { Space, Tag, Tooltip } from 'antd'
import {
    CheckCircleOutlined,
    SyncOutlined,
    WarningOutlined,
} from '@ant-design/icons'

export const ShowTableStatusTags = ({ record }) => {
    return (
        <Space wrap>
            {!record.finished_status ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    zakończono
                </Tag>
            ) : (
                <Tag icon={<SyncOutlined />} color="processing">
                    w trakcie
                </Tag>
            )}
            {(!record.koszulka_id || !record.nr_sprawy) && (
                <Tooltip
                    title="Brak utworzonej koszulki lub sprawy"
                    color="red"
                >
                    <Tag icon={<WarningOutlined />} color="error">
                        Błąd
                    </Tag>
                </Tooltip>
            )}
        </Space>
    )
}
