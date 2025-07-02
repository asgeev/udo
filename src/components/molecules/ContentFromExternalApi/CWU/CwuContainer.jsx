import { useRichTextContext } from '@hooks/useRichTextContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { useCwuData } from '@hooks/useCwuData'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import {
    Space,
    Spin,
    Button,
    Divider,
    Alert,
    Result,
    Typography,
    Flex,
    Tooltip,
    Card,
    Badge,
    Popover,
    Tag,
} from 'antd'
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons'

export const CwuContainer = () => {
    const { addTextToEditor, mainEditorRef } = useRichTextContext()

    const { currentRecordId } = useRecordsViewContext()
    //Fetch data
    const { data, isLoading, isFetching, error } = useCwuData(currentRecordId)
    //Get fields value from edit form
    const { messageApi } = useEditFormContext()

    const { Title, Text } = Typography

    const copiedMessage = () => {
        messageApi.info('Skopiowano do szablonu odpowiedzi')
    }

    const renderStatus = (type, description) => {
        switch (type) {
            case 'processing':
                return (
                    <>
                        <Badge status={type} />
                        <Text strong type="secondary" style={{ fontSize: 12 }}>
                            przetwarzanie
                        </Text>
                    </>
                )
            case 'success':
                return (
                    <>
                        <Badge status={type} />
                        <Text strong type="secondary" style={{ fontSize: 12 }}>
                            sukces
                        </Text>
                    </>
                )
            case 'error':
                return (
                    <>
                        <Badge status={type} />
                        <Tooltip title={description}>
                            <Text
                                strong
                                type="secondary"
                                style={{ fontSize: 12 }}
                                title={description}
                            >
                                błąd
                            </Text>{' '}
                            <InfoCircleOutlined style={{ fontSize: 10 }} />
                        </Tooltip>
                    </>
                )
            default:
                null
        }
    }

    if (error)
        return (
            <Result
                status="404"
                subTitle={
                    <Title level={5}>
                        {error?.response
                            ? error?.response?.data?.description
                            : 'Wystąpił błąd podczas pobierania danych z systemu CWU, prosimy spróbować później'}
                    </Title>
                }
            />
        )

    if (isLoading || isFetching)
        return (
            <Spin
                spinning={isLoading || isFetching}
                style={{ marginTop: 24, width: '100%' }}
            />
        )

    return (
        <>
            <Space
                direction="vertical"
                style={{ marginBottom: 30, width: '100%' }}
            >
                <Alert
                    type="info"
                    showIcon
                    description="Wyświetlane dane są danymi testowymi!"
                />
            </Space>

            <Space direction="vertical" style={{ display: 'flex' }}>
                {data && data?.length > 0 ? (
                    data?.map(
                        (
                            {
                                status,
                                created_time,
                                checkbox_name,
                                result,
                                first_name,
                                last_name,
                                pesel,
                                date_from,
                                date_to,
                            },
                            index
                        ) => (
                            <Card size="small" key={index}>
                                <Flex gap={16} vertical>
                                    <Flex
                                        align="center"
                                        justify="space-between"
                                    >
                                        <Flex align="center" gap={8}>
                                            {renderStatus(
                                                status?.type,
                                                status?.description
                                            )}
                                        </Flex>
                                        <Flex>
                                            <Tooltip title="Data utworzenia zapytania">
                                                <Text
                                                    strong
                                                    type="secondary"
                                                    style={{ fontSize: 12 }}
                                                >
                                                    {created_time}
                                                </Text>
                                            </Tooltip>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        align="center"
                                        justify="space-between"
                                    >
                                        <Flex vertical>
                                            <Text
                                                strong
                                                type="secondary"
                                                style={{ fontSize: 12 }}
                                            >
                                                Pytanie:
                                            </Text>
                                            <Popover
                                                style={{ width: 1000 }}
                                                content={
                                                    <>
                                                        <Text
                                                            strong
                                                            type="secondary"
                                                        >
                                                            Szczegółowe dane
                                                        </Text>
                                                        <Flex
                                                            vertical
                                                            gap={8}
                                                            style={{
                                                                marginTop: 16,
                                                            }}
                                                        >
                                                            <Flex>
                                                                <Tag>
                                                                    {first_name}
                                                                </Tag>
                                                                <Tag>
                                                                    {last_name}
                                                                </Tag>
                                                            </Flex>
                                                            <Flex
                                                                vertical
                                                                gap={8}
                                                            >
                                                                <Tag>
                                                                    {pesel}
                                                                </Tag>
                                                                <Flex>
                                                                    <Tag>
                                                                        {
                                                                            date_from
                                                                        }
                                                                    </Tag>
                                                                    <Tag>
                                                                        {
                                                                            date_to
                                                                        }
                                                                    </Tag>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
                                                    </>
                                                }
                                            >
                                                <Text
                                                    strong
                                                    style={{ fontSize: 12 }}
                                                >
                                                    {checkbox_name}
                                                </Text>
                                            </Popover>
                                        </Flex>
                                        <Tooltip title="Kopiuj do szablonu odpowiedzi">
                                            <Button
                                                icon={<CopyOutlined />}
                                                disabled={!result?.content}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    addTextToEditor(
                                                        mainEditorRef,
                                                        result?.content
                                                    )
                                                    copiedMessage()
                                                }}
                                            />
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                            </Card>
                        )
                    )
                ) : (
                    <Divider plain>Brak danych</Divider>
                )}
            </Space>
        </>
    )
}
