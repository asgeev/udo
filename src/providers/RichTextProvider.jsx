import { useRef, createContext } from 'react'
//Import styles and others
import { RichTextEditor } from '@molecules/RichTextEditor/RichTextEditor'

export const RichTextContext = createContext({
    mainEditorRef: undefined,
    attachmentsEditorRef: undefined,
    requestorTemplateEditorRef: undefined,
    addTextToEditor: () => {},
})

export const RichTextProvider = ({ children }) => {
    const mainEditorRef = useRef()
    const attachmentsEditorRef = useRef()
    const requestorTemplateEditorRef = useRef()

    const addTextToEditor = (selectedEditorRef, htmlTemplate) => {
        const editorRef = selectedEditorRef?.current?.getEditor()
        const range = editorRef.getSelection()

        if (range) {
            if (range.length == 0) {
                console.log('User cursor is at index', range.index)
            } else {
                var text = editorRef.getText(range.index, range.length)
                console.log('User has highlighted: ', text)
            }
        } else {
            console.log('User cursor is not in editor')
        }

        let oldHTML = `${editorRef?.root?.innerHTML}`
        let newHTML = `${oldHTML}<p><br></p>${htmlTemplate}`
        editorRef?.clipboard?.dangerouslyPasteHTML(newHTML)
    }

    return (
        <RichTextContext.Provider
            value={{
                mainEditorRef,
                attachmentsEditorRef,
                requestorTemplateEditorRef,
                addTextToEditor,
            }}
        >
            {children}
        </RichTextContext.Provider>
    )
}
