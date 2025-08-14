import { Flex, Tooltip, Badge, Typography } from 'antd'

export const Status = (props) => {
    const { status, description } = props

    let statusText

    switch (status) {
        case 'processing':
            statusText = 'przetwarzanie'
            break
        case 'success':
            statusText = 'sukces'
            break
        case 'error':
            statusText = 'błąd'
            break
        default:
            statusText = 'nieznany'
            break
    }

    return (
        <Flex gap={8} align="center" title={description}>
            <Badge status={status ?? 'default'} />
            <Tooltip title={description}>
                <Typography.Text
                    strong
                    type="secondary"
                    style={{ fontSize: 12 }}
                >
                    {statusText}
                </Typography.Text>
            </Tooltip>
        </Flex>
    )
}
