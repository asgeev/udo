import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Input } from 'antd'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'
import { EditFormContext } from '../EditFormProvider/EditFormProvider'

export const ReplyTemplateFormSectionEditMode = ({ editMode }) => {
    const [editorContent, setEditorContent] = useState('')
    const quillRef = useRef()
    const context = useContext(EditFormContext)
    const initialValue = context?.initialFormData?.template_main_text
    const editForm = Form.useFormInstance()

    const setInitialValues = (value) => {
        const editor = quillRef?.current?.getEditor()
        editor?.clipboard?.dangerouslyPasteHTML(value)
        /*Fix scrool behavior when pass value to richtext editor */
        editForm.scrollToField('rpw', { block: 'center' })
    }

    useLayoutEffect(() => {
        if (initialValue) {
            setInitialValues(initialValue)
        }
    }, [initialValue])

    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Form.Item name="template_main_text">
                <>
                    <RichTextEditor
                        quillRef={quillRef}
                        editorContent={editorContent}
                        setEditorContent={setEditorContent}
                    />
                </>
            </Form.Item>
            <Form.Item name="signature_id">
                <Input />
            </Form.Item>
        </FormSection>
    )
}
