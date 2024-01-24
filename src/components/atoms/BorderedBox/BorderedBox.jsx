import { Typography, Space } from 'antd'
import { Container } from './BorderedBox.styles'

export const BorderedBox = ({ title, description, children }) => {
    const { Text } = Typography

    return (
        <Container>
            <Space direction="vertical" size={10}>
                <Space direction="vertical" size={1}>
                    {title && <Text strong>{title}</Text>}
                    {description && <Text type="secondary">{description}</Text>}
                </Space>
                {children}
            </Space>
        </Container>
    )
}
