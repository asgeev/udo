import {
    Space,
    Button,
    Flex,
    Tooltip,
    Card,
    Badge,
    Popover,
    Typography,
    Tag,
} from 'antd'
import { CalendarOutlined, CopyOutlined, EyeOutlined } from '@ant-design/icons'

const { Text } = Typography

const Status = (props) => {
    const { status, description } = props

    let text

    switch (status) {
        case 'processing':
            text = 'przetwarzanie'
            break
        case 'success':
            text = 'sukces'
            break
        case 'error':
            text = 'błąd'
            break
        default:
            text = 'nieznany'
            break
    }

    return (
        <Flex gap={8} align="center" title={description}>
            <Badge status={status ?? 'default'} />
            <Tooltip title={description}>
                <Text strong type="secondary" style={{ fontSize: 12 }}>
                    {text}
                </Text>
            </Tooltip>
        </Flex>
    )
}

const ShowDescription = (props) => {
    const { firstName, lastName, pesel, dateFrom, dateTo } = props

    const content = (
        <Space direction="vertical">
            <Text strong type="secondary" style={{ fontSize: 12 }}>
                {firstName} {lastName}
                <br />
                {pesel}
                <br />
                <CalendarOutlined /> {dateFrom} - <CalendarOutlined /> {dateTo}
            </Text>
        </Space>
    )
    return (
        <Popover
            title={
                <Text strong style={{ fontSize: 12 }}>
                    Informacje zapytania
                </Text>
            }
            content={content}
        >
            <Text type="secondary">
                <EyeOutlined />
            </Text>
        </Popover>
    )
}

// Description structure
// description = {
//     first_name,
//     last_name,
//     pesel,
//     date_from,
//     date_to
// }

export const JobsItem = (props) => {
    const {
        title,
        status,
        statusDescription,
        systemName,
        createdTime,
        onCopy,
        disabled,
        description,
    } = props

    return (
        <Card size="small">
            <Flex vertical gap={8}>
                <Flex gap={8} justify="space-between">
                    <Status status={status} description={statusDescription} />

                    <Flex align="center" gap={8}>
                        <ShowDescription
                            firstName={description?.firstName}
                            lastName={description?.lastName}
                            pesel={description?.pesel}
                            dateFrom={description?.dateFrom}
                            dateTo={description?.dateTo}
                        />

                        <Text
                            strong
                            type="secondary"
                            style={{ fontSize: 12 }}
                            title="Data utworzenia zlecenia"
                        >
                            {createdTime}
                        </Text>

                        {systemName && (
                            <Tag bordered={false} style={{ margin: 0 }}>
                                {systemName}
                            </Tag>
                        )}
                    </Flex>
                </Flex>

                <Flex gap={8} justify="space-between">
                    <Text strong style={{ fontSize: 12 }}>
                        {title}
                    </Text>

                    <Button
                        disabled={disabled}
                        title="Kopiuj do szablonu odpowiedzi"
                        icon={<CopyOutlined />}
                        onClick={onCopy}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}
