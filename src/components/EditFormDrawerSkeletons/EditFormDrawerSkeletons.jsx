import { Skeleton, Space } from 'antd'

export const EditFormDrawerSkeletons = () => {
    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </Space>
    )
}
