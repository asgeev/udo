import { Button, List, Flex, Typography, Popconfirm } from 'antd'
import { PaperClipOutlined, DeleteOutlined } from '@ant-design/icons'

export const AttachmentItem = ({ item, onOpen, onDelete }) => {
    const { Text } = Typography

    return (
        <List.Item
            actions={[
                <Button
                    key={'open'}
                    type="text"
                    title="Otwórz załącznik"
                    onClick={() => onOpen(item)}
                >
                    Otwórz
                </Button>,
                <Popconfirm
                    key={'delete'}
                    title="Usuwanie załącznika"
                    description="Na pewno chcesz usunąć ten załącznik?"
                    placement="topLeft"
                    okText="Usuń"
                    onConfirm={() => onDelete(item)}
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        title="Usuń załączniki"
                    />
                </Popconfirm>,
            ]}
        >
            <List.Item.Meta
                avatar={<PaperClipOutlined />}
                title={
                    <Flex vertical>
                        <Text style={{ fontSize: 12 }} strong>
                            {item?.name}
                        </Text>
                        <Text style={{ fontSize: 12 }} type={'secondary'}>
                            {item?.created_time}
                        </Text>
                    </Flex>
                }
            />
        </List.Item>
    )
}
