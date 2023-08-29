import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//Custom css for quill rich text editor
import '../RichTextEditor/customStylesRichTextEditor.css'

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

export const RichTextEditor = ({ quillRef, onChange }) => {
    return (
        <>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Wpisz swoją odpowiedź"
                modules={modules}
                preserveWhitespace
                onChange={onChange}
            />
        </>
    )
}
