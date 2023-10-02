import {
    Space,
    Spin,
    Button,
    Descriptions,
    Divider,
    Collapse,
    Alert,
} from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import {
    template4,
    template7,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useCwuData } from '@hooks/useCwuData'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const CwuContainer = () => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useRichTextContext()

    const { currentRecordId } = useRecordsViewContext()

    const { data, isLoading, error } = useCwuData(currentRecordId)

    const newData = data?.data

    const templateUbezpieczenie = template7(newData)
    const templateDaneAdresowe = template4(newData)

    const descriptionItems = [
        {
            key: '1',
            label: 'Pesel',
            children: <p>{newData?.pesel}</p>,
        },
        {
            key: '2',
            label: 'Płeć',
            children: <p>{newData?.plec}</p>,
            span: 2,
        },
        {
            key: '3',
            label: 'Imię',
            children: <p>{newData?.imie}</p>,
        },
        {
            key: '4',
            label: 'Nazwisko',
            children: <p>{newData?.nazwisko}</p>,
        },
    ]

    const collapseItems = [
        {
            key: '1',
            label: 'Ubezpieczenie',
            showArrow: true,
            extra: (
                <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                        addTextToEditor(mainEditor, templateUbezpieczenie)
                    }}
                />
            ),
            children: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: templateUbezpieczenie,
                    }}
                ></div>
            ),
        },
        {
            key: '2',
            label: 'Dane adresowe',
            showArrow: true,
            extra: (
                <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                        addTextToEditor(mainEditor, templateDaneAdresowe)
                    }}
                />
            ),
            children: (
                <div
                    dangerouslySetInnerHTML={{
                        __html: templateDaneAdresowe,
                    }}
                ></div>
            ),
        },
    ]

    if (error)
        return (
            <Alert
                showIcon
                message="Błąd"
                description={error.message}
                type="error"
            />
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
