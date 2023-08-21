import { Space, Tag } from 'antd'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'

export const ShowTableStatusTags = ({ finished_status = 0 }) => {
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
