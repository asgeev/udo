import { useRichTextContext } from '@hooks/useRichTextContext'
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
} from 'antd'
import { mergeTemplateObject } from '@helpers/mergeTemplateObject'
import { CopyOutlined } from '@ant-design/icons'
import { templates } from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const CwuContainer = () => {
    const { addTextToEditor, mainEditorRef } = useRichTextContext()
    const { currentRecordId } = useRecordsViewContext()
    const { data, isLoading, error } = useCwuData(currentRecordId)

    const { Paragraph, Text } = Typography

    const templateUbezpieczenie = templates.ubezpieczenieZdrowotne(data)
    const templateDaneAdresowe = templates.daneAdresowe(data)

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
            children: <p>{data?.imie}</p>,
        },
        {
            key: '4',
            label: 'Nazwisko',
            children: <p>{data?.nazwisko}</p>,
        },
    ]

    const collapseItems = [
        {
            key: '1',
            label: 'Informacja o ubezpieczniu',
            showArrow: true,
            extra: (
                <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                        addTextToEditor(
                            mainEditorRef,
                            mergeTemplateObject(templateUbezpieczenie)
                        )
                    }}
                />
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
                <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                        addTextToEditor(
                            mainEditorRef,
                            mergeTemplateObject(templateDaneAdresowe)
                        )
                    }}
                />
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
            <>
                <Result status="error" title="Ups! Coś poszło nie tak!">
                    <div className="desc">
                        <Paragraph>
                            <Text
                                strong
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Opis błędu:
                            </Text>
                        </Paragraph>
                        {error?.response
                            ? error?.response?.data?.description
                            : 'Wystąpił błąd podczas pobierania danych z systemu CWU, prosimy spróbować później'}
                    </div>
                </Result>
            </>
        )

    return (
        <>
            <Space
                direction="vertical"
                style={{ marginBottom: 30, width: '100%' }}
            >
                <Alert
                    type="warning"
                    showIcon
                    description="Uwaga! Wyświetlane dane są danymi testowymi!"
                />
            </Space>

            <Spin tip="Pobieranie danych z CWU..." spinning={isLoading}>
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
