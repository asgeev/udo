import { useEffect, useState } from 'react'
import { Form, Select, Space, Button, Tabs, Collapse, Tooltip } from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import ReactQuill from 'react-quill'
import WP_Instance from '@services/WP_Instance'
import { FormSection } from '@molecules/FormSection/FormSection'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'
import { createSignaturesDataOptions } from '@helpers/createSignaturesDataOptions'
import { RichTextEditor } from '@molecules/RichTextEditor/RichTextEditor'
import { useDrawersContext } from '@hooks/useDrawersContext'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
}

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useDrawersContext()
    const { mainEditorRef, attachmentsEditorRef } = useRichTextContext()
    const editForm = Form.useFormInstance()
    const pesel = editForm.getFieldValue('pesel')

    const [signatures, setSignatures] = useState(null)

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
                            id="template_main_text"
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
                        id="template_attachments_text"
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
                        onClick={openSecondDrawer}
                        disabled={pesel ? false : true}
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

            <Tabs items={tabsItems} animated />

            <Form.Item name="signature_id" label="Podpis na piśmie">
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
