import { useContext, useLayoutEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Input, Space, Button } from 'antd'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'
import { EditFormContext } from '../Providers/EditFormProvider/EditFormProvider'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
import {
    templateText1,
    templateText2,
} from '../RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const ReplyTemplateFormSectionEditMode = ({ editMode }) => {
    const { initialFormData, showSecondDrawer } = useContext(EditFormContext)
    const {
        mainEditor,
        handleChangeContent,
        attachmentsEditor,
        setInitialValues,
        addTextToEditor,
    } = useContext(RichTextContext)
    const editForm = Form.useFormInstance()
    const initialValue = initialFormData

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
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Space>
                <Button
                    onClick={() =>
                        addTextToEditor(event, templateText1, mainEditor)
                    }
                >
                    Szablon 1
                </Button>
                <Button
                    onClick={() =>
                        addTextToEditor(event, templateText2, mainEditor)
                    }
                >
                    Szablon 2
                </Button>
            </Space>
            <button onClick={showSecondDrawer}>Mock CWU</button>
            <Form.Item name="template_main_text">
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
            </Form.Item>

            <Form.Item name="signature_id">
                <Input />
            </Form.Item>
            <Form.Item name="template_attachments_text">
                <RichTextEditor
                    quillRef={attachmentsEditor}
                    onChange={(value, delta, source, editor) => {
                        handleChangeContent(editor, editForm, 'aaa')
                    }}
                />
            </Form.Item>
        </FormSection>
    )
}
