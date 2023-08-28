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

export const RichTextEditor = ({
    quillRef,
    editorContent,
    setEditorContent,
}) => {
    const editForm = Form.useFormInstance()

    const addTextToEditor = (event, delta, data) => {
        event.preventDefault()
        const editor = quillRef?.current?.getEditor()
        const selection = editor?.getSelection(true)
        editor?.updateContents(delta(selection, data))
    }

    const handleChangeContent = (content, delta, source, editor) => {
        editForm.setFieldValue('template_main_text', editor.getHTML())
        setEditorContent(editor.getHTML())
    }

    return (
        <>
            <button
                onClick={() => {
                    addTextToEditor(event, templateText1)
                }}
            >
                Szablon 1
            </button>
            <button onClick={() => addTextToEditor(event, templateText2)}>
                Szablon 2
            </button>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Wpisz swoją odpowiedź"
                modules={modules}
                value={editorContent}
                preserveWhitespace
                onChange={(value, delta, source, editor) =>
                    handleChangeContent(value, delta, source, editor)
                }
            />
        </>
    )
}
