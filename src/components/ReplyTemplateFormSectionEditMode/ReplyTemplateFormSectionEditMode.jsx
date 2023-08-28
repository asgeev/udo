import { useLayoutEffect, useRef, useState } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Alert, Form, Input } from 'antd'
import { FullCheckboxForm } from '../FullCheckboxForm/FullCheckboxForm'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'

export const ReplyTemplateFormSectionEditMode = ({ editMode }) => {
    const [editorContent, setEditorContent] = useState('')
    const quillRef = useRef()

    // const editForm = Form.useFormInstance()

    // useLayoutEffect(() => {
    //     editForm.setFieldValue('signature_id', '1')
    //     editForm.setFieldValue('template_main_text', editorContent)
    // }, [editorContent])
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
