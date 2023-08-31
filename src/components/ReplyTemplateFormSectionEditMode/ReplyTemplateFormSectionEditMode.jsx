import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Select, Space, Button, Tabs, Collapse, Tooltip } from 'antd'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'
import { EditFormContext } from '../Providers/EditFormProvider/EditFormProvider'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
import { PasteButtons } from '../PasteButtons/PasteButtons'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import WP_Instance from '../../services/WP_Instance'
import { createSignaturesDataOptions } from '../../helpers/createSignaturesDataOptions'

export const ReplyTemplateFormSectionEditMode = ({ editMode }) => {
    const { initialFormData, showSecondDrawer, setError } =
        useContext(EditFormContext)
    const [signatures, setSignatures] = useState(null)
    const {
        mainEditor,
        handleChangeContent,
        attachmentsEditor,
        setInitialValues,
    } = useContext(RichTextContext)
    const editForm = Form.useFormInstance()
    const initialValue = initialFormData

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
            key: '1',
            label: (
                <span>
                    <SisternodeOutlined />
                    Odpowiedź
                </span>
            ),

            children: (
                <Form.Item name="template_main_text">
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: '100%' }}
                    >
                        <Collapse ghost size="small" items={collapseItems} />
                        <RichTextEditor
                            quillRef={mainEditor}
                            onChange={(value, delta, source, editor) => {
                                handleChangeContent(
                                    editor,
                                    editForm,
                                    'template_main_text'
                                )
                            }}
                        />
                    </Space>
                </Form.Item>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    <PaperClipOutlined />
                    Załączniki
                </span>
            ),
            children: (
                <Form.Item name="template_attachments_text">
                    <RichTextEditor
                        quillRef={attachmentsEditor}
                        onChange={(value, delta, source, editor) => {
                            handleChangeContent(editor, editForm, 'aaa')
                        }}
                    />
                </Form.Item>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    <IdcardOutlined />
                    Adresat
                </span>
            ),
            disabled: true,
        },
    ]

    //${editForm} varialble passed only for prevent scrolling to rich text editor
    useLayoutEffect(() => {
        if (initialValue) {
            setInitialValues(
                initialValue?.template_main_text,
                mainEditor,
                editForm
            )
            setInitialValues(
                initialValue?.template_attachments_text,
                attachmentsEditor,
                editForm
            )
        }
    }, [initialValue])

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
                        onClick={() => {
                            showSecondDrawer()
                        }}
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

            <Tabs items={tabsItems} />

            <Form.Item name="signature_id" label="Podpis na piśmie">
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz podpis"
                    allowClear
                    options={signatures}
                ></Select>
            </Form.Item>
        </FormSection>
    )
}
