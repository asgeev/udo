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
    const { editForm } = useEditFormContext()
    const firstName = editForm?.getFieldValue('first_name')
    const lastName = editForm?.getFieldValue('last_name')

    const { Paragraph, Text } = Typography

    //Generate templates
    const templateUbezpieczenie = templates.ubezpieczenieZdrowotne(data)
    const templateDaneAdresowe = templates.daneAdresowe(data)

    //Check if strings of first name and last name are equal
    const isFirstNameEqual =
        data?.imie?.toUpperCase() === firstName?.toUpperCase()
    const isLastNameEqual =
        data?.nazwisko?.toUpperCase() === lastName?.toUpperCase()

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

            <Spin
                tip="Pobieranie danych z CWU..."
                spinning={isLoading || isFetching}
            >
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
