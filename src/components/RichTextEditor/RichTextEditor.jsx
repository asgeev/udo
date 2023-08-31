import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//Custom css for quill rich text editor
import '../RichTextEditor/customStylesRichTextEditor.css'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
}

export const RichTextEditor = ({ quillRef, onChange }) => {
    return (
        <>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Wpisz swoją odpowiedź"
                modules={modules}
                onChange={onChange}
                defaultValue={null}
            />
        </>
    )
}
