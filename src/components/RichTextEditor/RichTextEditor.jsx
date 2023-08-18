import { useState, useRef } from 'react'
import { Form } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//Custom css for quill rich text editor
import '../RichTextEditor/customStylesRichTextEditor.css'
import {
    templateText1,
    templateText2,
} from './TemplatesRichTextEditor/TemplatesRichTextEditor'

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
    ],
}

export const RichTextEditor = ({ formField }) => {
    const [content, setContent] = useState('')
    const quillRef = useRef()
    const form = Form.useFormInstance()
    const aaa = 'asfasf'

    const addTextToEditor = (event, delta, data) => {
        event.preventDefault()
        const editor = quillRef?.current?.getEditor()
        const selection = editor?.getSelection(true)

        editor?.updateContents(delta(selection, data))
    }

    const handleContent = (value) => {
        setContent(value)
        form.setFieldValue(formField, value)
    }

    return (
        <>
            <button onClick={() => addTextToEditor(event, templateText1, aaa)}>
                Click
            </button>
            <button onClick={() => addTextToEditor(event, templateText2, aaa)}>
                Click 2
            </button>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Wpisz swoją odpowiedź"
                modules={modules}
                preserveWhitespace
                value={content}
                onChange={handleContent}
            />
        </>
    )
}
