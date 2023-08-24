import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Form, Select, Space, Button, Tabs, Collapse, Tooltip } from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import WP_Instance from '@services/WP_Instance'
import { FormSection } from '@molecules/FormSection/FormSection'
import { RichTextEditor } from '@molecules/RichTextEditor/RichTextEditor'
import { EditFormContext } from '@providers/EditFormProvider'
import { RichTextContext } from '@providers/RichTextProvider'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'
import { createSignaturesDataOptions } from '@helpers/createSignaturesDataOptions'

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

    //${editForm} varialble passed only for prevent scrolling to rich text editor
    // useLayoutEffect(() => {
    //     if (initialValue) {
    //         setInitialValues(
    //             initialValue.template_main_text,
    //             mainEditor,
    //             editForm,
    //             true
    //         )
    //         setInitialValues(
    //             initialValue.template_attachments_text,
    //             attachmentsEditor,
    //             editForm,
    //             true
    //         )
    //     }
    // }, [initialValue])

    // const updateSecondEditor = () => {
    //     setInitialValues(
    //         initialValue.template_attachments_text,
    //         attachmentsEditor,
    //         editForm,
    //         true
    //     )
    // }

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
                            content={initialFormData?.template_main_text}
                        />
                    </Space>
                </Form.Item>
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
            children: (
                <Form.Item name="template_attachments_text">
                    <RichTextEditor
                        quillRef={attachmentsEditor}
                        onChange={(value, delta, source, editor) => {
                            handleChangeContent(
                                editor,
                                editForm,
                                'template_attachments_text'
                            )
                        }}
                        content={initialFormData?.template_attachments_text}
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

            <Tabs animated items={tabsItems} />

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
