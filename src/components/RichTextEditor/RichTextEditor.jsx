import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export function RichTextEditor({ setRichTextContent }) {
    const [value, setValue] = useState('')

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={(text) => {
                setValue(text)
                setRichTextContent(text)
            }}
        />
    )
}
