import { useContext, useLayoutEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Input, Space, Button, Divider, Tabs } from 'antd'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'
import { EditFormContext } from '../Providers/EditFormProvider/EditFormProvider'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
import { PasteButtons } from '../PasteButtons/PasteButtons'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'

export const ReplyTemplateFormSectionEditMode = ({ editMode }) => {
    const { initialFormData, showSecondDrawer } = useContext(EditFormContext)
    const {
        mainEditor,
        handleChangeContent,
        attachmentsEditor,
        setInitialValues,
    } = useContext(RichTextContext)
    const editForm = Form.useFormInstance()
    const initialValue = initialFormData
    const items = [
        {
            key: '1',
            label: (
                <span>
                    <AndroidOutlined /> Odpowiedź
                </span>
            ),

            children: (
                <Form.Item name="template_main_text">
                    <>
                        <PasteButtons />
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
                    </>
                </Form.Item>
            ),
        },
        {
            key: '2',
            label: 'Załączniki',
            children: (
                <Form.Item label="Załączniki" name="template_attachments_text">
                    <RichTextEditor
                        quillRef={attachmentsEditor}
                        onChange={(value, delta, source, editor) => {
                            handleChangeContent(editor, editForm, 'aaa')
                        }}
                    />
                </Form.Item>
            ),
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

    const onChange = (key) => {
        console.log(key)
    }
    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Button
                type="primary"
                onClick={() => {
                    showSecondDrawer()
                }}
            >
                CWU
            </Button>
            <Divider />
            <Tabs onChange={onChange} type="card" items={items} />
            <Form.Item name="signature_id">
                <Input />
            </Form.Item>
        </FormSection>
    )
}
