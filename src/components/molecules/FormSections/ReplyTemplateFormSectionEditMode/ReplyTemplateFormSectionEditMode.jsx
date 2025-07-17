import ReactQuill from 'react-quill'
//Import contexts
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { useGetSignatureListQuery } from '@hooks/useGetSignatureListQuery'
import {
    Form,
    Select,
    Space,
    Button,
    Tabs,
    Collapse,
    List,
    Divider,
    Flex,
    Tooltip,
} from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
//Import components
import { FormSection } from '@molecules/FormSection/FormSection'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'
import { UploadFile } from '@molecules/UploadFile/UploadFile'

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useSecondDrawerContext()
    const { mainEditorRef } = useRichTextContext()
    const { formDisabled } = useEditFormContext()

    //Fetch inflow way list
    const { data, isError } = useGetSignatureListQuery()

    //Temporary variable
    const attachements = []

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
                <Flex vertical gap={8}>
                    <UploadFile />
                    <List
                        bordered
                        size="small"
                        dataSource={attachements ?? []}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        key={'open'}
                                        title="Otwórz załącznik"
                                    >
                                        Otwórz
                                    </Button>,
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        key={'delete'}
                                        title="Usuń załączniki"
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<PaperClipOutlined />}
                                    title={item.fileName}
                                    description={item.createdAt}
                                />
                            </List.Item>
                        )}
                    />
                </Flex>
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
            <Divider />

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
