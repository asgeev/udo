import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//Custom css for quill rich text editor
import '@molecules/RichTextEditor/customStylesRichTextEditor.css'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
}

export const RichTextEditor = ({ ref, id, placeholder }) => {
    return (
        <ReactQuill
            // ref={React.forwardRef(ref)}
            id={id}
            modules={modules}
            theme="snow"
            placeholder="Wpisz swoją odpowiedź"
        />
    )
}
