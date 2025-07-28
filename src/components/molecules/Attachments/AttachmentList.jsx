import { List } from 'antd'

export const AttachmentsList = ({ attachements = [], renderItem }) => {
    return (
        <List
            bordered
            size="small"
            dataSource={attachements}
            renderItem={renderItem}
        />
    )
}
