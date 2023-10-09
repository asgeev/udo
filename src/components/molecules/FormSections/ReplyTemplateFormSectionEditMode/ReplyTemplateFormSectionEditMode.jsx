import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
//Import contexts
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { useEditFormContext } from '@hooks/useEditFormContext'

import WP_Instance from '@services/WP_Instance'
import {
    Form,
    Select,
    Space,
    Button,
    Tabs,
    Collapse,
    Tooltip,
    Alert,
} from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
//Import components
import { FormSection } from '@molecules/FormSection/FormSection'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'

import { createSignaturesDataOptions } from '@helpers/createSignaturesDataOptions'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
}

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useSecondDrawerContext()
    const { mainEditorRef, attachmentsEditorRef } = useRichTextContext()
    const { formDisabled } = useEditFormContext()
    const editForm = Form.useFormInstance()
    const pesel = editForm.getFieldValue('pesel')
    const koszulka_id = editForm.getFieldValue('koszulka_id')
    const nr_sprawy = editForm.getFieldValue('nr_sprawy')

    const [signatures, setSignatures] = useState(null)

    const areFiledsEmpty = pesel && koszulka_id && nr_sprawy ? false : true

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getSignatureList`)
            .then((response) => {
                setSignatures(createSignaturesDataOptions(response?.data))
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
    }, [])

    const collapseItems = [
        {
            key: '1',
            label: 'Rozwiń aby dodać szablon do treści',
            children: <PasteButtons />,
        },
    ]
    const tabsItems = [
        {
            key: 1,
            label: (
                <span>
                    <SisternodeOutlined />
                    Odpowiedź
                </span>
            ),
            forceRender: true,
            children: (
                <>
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: '100%', marginBottom: 10 }}
                    >
                        <Collapse ghost size="small" items={collapseItems} />
                    </Space>
                    <Form.Item name="template_main_text">
                        <ReactQuill
                            ref={mainEditorRef}
                            modules={modules}
                            readOnly={formDisabled}
                            placeholder="Tutaj wpisz swoją odpowiedź"
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            key: 2,
            label: (
                <span>
                    <PaperClipOutlined />
                    Załączniki
                </span>
            ),
            forceRender: true,
            children: (
                <Form.Item name="template_attachments_text">
                    <ReactQuill
                        ref={attachmentsEditorRef}
                        modules={modules}
                        readOnly={formDisabled}
                        placeholder="Tutaj wpisz listę załączników"
                    />
                </Form.Item>
            ),
        },
        {
            key: 3,
            label: (
                <span>
                    <IdcardOutlined />
                    Adresat
                </span>
            ),
            disabled: true,
        },
    ]

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane szablonu odpowiedzi"
            subTitle={'Wpisz poniżej odpowiedź która znajdzie się na piśmie'}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {areFiledsEmpty && (
                    <Space direction="vertical">
                        <Alert
                            type="error"
                            message="Uwaga!"
                            description="Wszystkie wskazane poniżej czynności prosimy robić z poziomu aplikacji UDO!!"
                            showIcon
                        />
                        <Alert
                            type="warning"
                            description={`Przyciski do pobierania danych zostały wyłączone, ponieważ w sprawie brakuje jednego z wymienionych elementów:`}
                            showIcon
                        />

                        {!pesel && (
                            <Alert
                                type="warning"
                                description={`Nieuzupełnione pole pesel`}
                                showIcon
                            />
                        )}
                        {!koszulka_id && (
                            <Alert
                                type="warning"
                                description={`Brak utworzonej koszulki w EZD -> możesz ponownie spróbować utworzy ją z poziomu podglądu spraw`}
                                showIcon
                            />
                        )}
                        {!nr_sprawy && (
                            <Alert
                                type="warning"
                                description={`Brak założonej sprawy na koszulce w EZD -> możesz ponownie spróbować utworzyć sprawę w EZD dla tej koszulki z poziomu podglądu spraw`}
                                showIcon
                            />
                        )}
                    </Space>
                )}

                <Space
                    direction="horizontal"
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Tooltip title="Pokaż dane z CWU">
                        <Button
                            icon={<TeamOutlined />}
                            type="primary"
                            onClick={(e) => {
                                e.preventDefault()
                                openSecondDrawer(1)
                            }}
                            disabled={areFiledsEmpty}
                        >
                            CWU
                        </Button>
                    </Tooltip>
                    <Button type="primary" disabled>
                        Koszty leczenia
                    </Button>
                    <Button type="primary" disabled>
                        SoFU
                    </Button>
                    <Button type="primary" disabled>
                        BO
                    </Button>
                </Space>
            </Space>

            <Tabs items={tabsItems} animated />

            <Form.Item
                name="signature_id"
                label="Podpis na piśmie"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Wybierz podpis który znajdzie się na piśmie',
                    },
                ]}
            >
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz podpis"
                    allowClear
                    options={signatures}
                />
            </Form.Item>
        </FormSection>
    )
}
