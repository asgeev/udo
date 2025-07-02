import ReactQuill from 'react-quill'
//Import contexts
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { useGetSignatureListQuery } from '@hooks/useGetSignatureListQuery'
import { Form, Select, Space, Button, Tabs, Collapse, Tooltip } from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
//Import components
import { FormSection } from '@molecules/FormSection/FormSection'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useSecondDrawerContext()
    const { mainEditorRef, attachmentsEditorRef } = useRichTextContext()
    const { formDisabled } = useEditFormContext()

    //Fetch inflow way list
    const { data, isError } = useGetSignatureListQuery()

    //Set global error state
    isError && setError(true)

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    }
    const collapseItems = [
        {
            key: '1',
            label: 'Rozwiń, aby dodać szablon do treści',
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
                            id="afg"
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
                        >
                            CWU
                        </Button>
                    </Tooltip>
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
                    options={data}
                />
            </Form.Item>
        </FormSection>
    )
}
