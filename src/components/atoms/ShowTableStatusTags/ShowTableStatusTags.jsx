import { Space, Tag, Tooltip } from 'antd'

export const ShowTableStatusTags = ({ record }) => {
    const { status } = record
    return (
        <Space wrap>
            {status && (
                <Tooltip title={status?.description}>
                    <Tag title={status.type}>{status.type}</Tag>
                </Tooltip>
            )}
        </Space>
    )
}
