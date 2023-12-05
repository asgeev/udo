import { useRichTextContext } from '@hooks/useRichTextContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { useCwuData } from '@hooks/useCwuData'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import {
    Space,
    Spin,
    Button,
    Descriptions,
    Divider,
    Collapse,
    Alert,
    Result,
    Typography,
    Tooltip,
} from 'antd'
import { mergeTemplateObject } from '@helpers/mergeTemplateObject'
import { CopyOutlined, WarningOutlined } from '@ant-design/icons'
import { templates } from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const CwuContainer = () => {
    const { addTextToEditor, mainEditorRef } = useRichTextContext()

    const { currentRecordId } = useRecordsViewContext()
    //Fetch data
    const { data, isLoading, isFetching, error } = useCwuData(currentRecordId)
    //Get fields value from edit form
    const { editForm, messageApi } = useEditFormContext()

    const firstName = editForm?.getFieldValue('first_name')

    const lastName = editForm?.getFieldValue('last_name')

    const { Paragraph, Title } = Typography
    //Generate templates
    const templateUbezpieczenie = templates.ubezpieczenieZdrowotne(data)

    const templateDaneAdresowe = templates.daneAdresowe(data)

    //Check if strings of first name and last name are equal
    const isFirstNameEqual =
        data?.imie?.toUpperCase() === firstName?.toUpperCase()

    const isLastNameEqual =
        data?.nazwisko?.toUpperCase() === lastName?.toUpperCase()

    const copiedMessage = () => {
        messageApi.info('Skopiowano do szablonu odpowiedzi')
    }

    const descriptionItems = [
        {
            key: '1',
            label: 'Pesel',
            children: <p>{data?.pesel}</p>,
        },
        {
            key: '2',
            label: 'Płeć',
            children: <p>{data?.plec}</p>,
            span: 2,
        },
        {
            key: '3',
            label: 'Imię',
            children: (
                <Space align="baseline">
                    <Paragraph type={!isFirstNameEqual && 'warning'}>
                        {data?.imie}
                    </Paragraph>
                    {isFirstNameEqual ||
                        (!isLoading && (
                            <WarningOutlined style={{ color: '#faad14' }} />
                        ))}
                </Space>
            ),
        },
        {
            key: '4',
            label: 'Nazwisko',
            children: (
                <Space align="baseline">
                    <Paragraph type={!isLastNameEqual && 'warning'}>
                        {data?.nazwisko}
                    </Paragraph>
                    {isLastNameEqual ||
                        (!isLoading && (
                            <WarningOutlined style={{ color: '#faad14' }} />
                        ))}
                </Space>
            ),
        },
    ]

    const collapseItems = [
        {
            key: '1',
            label: 'Informacja o ubezpieczeniu',
            showArrow: true,
            extra: (
                <Tooltip title="Kopiuj do szablonu odpowiedzi">
                    <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            addTextToEditor(
                                mainEditorRef,
                                mergeTemplateObject(templateUbezpieczenie)
                            )
                            copiedMessage()
                        }}
                    />
                </Tooltip>
            ),
            children: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: templateUbezpieczenie?.html,
                    }}
                ></div>
            ),
        },
        {
            key: '2',
            label: 'Dane adresowe/teleadresowe',
            showArrow: true,
            extra: (
                <Tooltip title="Kopiuj do szablonu odpowiedzi">
                    <Button
                        size="small"
                        icon={<CopyOutlined />}
                        tooltip="asf"
                        onClick={(event) => {
                            event.stopPropagation()
                            addTextToEditor(
                                mainEditorRef,
                                mergeTemplateObject(templateDaneAdresowe)
                            )
                            copiedMessage()
                        }}
                    />
                </Tooltip>
            ),
            children: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: templateDaneAdresowe?.html,
                    }}
                ></div>
            ),
        },
    ]

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
                {(isFirstNameEqual && isLastNameEqual) ||
                    (!isLoading && (
                        <Alert
                            message="Uwaga!"
                            type="warning"
                            showIcon
                            description="Niektóre dane pobrane z CWU nie pasują do danych znajdujących się w zapytaniu!"
                        />
                    ))}
            </Space>

            <Spin tip="Pobieranie danych..." spinning={isLoading || isFetching}>
                <Descriptions
                    size="small"
                    title="Dane osoby"
                    items={descriptionItems}
                />
                <Space
                    direction="vertical"
                    style={{ width: '100%', marginTop: 20 }}
                >
                    <Collapse items={collapseItems} />
                    <Divider plain>więcej już niedługo</Divider>
                </Space>
            </Spin>
        </>
    )
}
