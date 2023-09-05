import { useState, useRef, createContext } from 'react'

export const RichTextContext = createContext({
    mainEditor: null,
    attachmentsEditor: null,
    requestorTemplateEditor: null,
    addTextToEditor: () => {},
    handleChangeContent: () => {},
    setInitialValues: () => {},
})

export const RichTextProvider = ({ children }) => {
    const [mainEditorValue, setMainEditorValue] = useState('')
    const [attachmentsEditorValue, setAttachmentsEditorValue] = useState('')
    const [requestorTemplateEditorValue, setRequestorTemplateEditorValue] =
        useState('')
    const mainEditorRef = useRef()
    const attachmentsEditorRef = useRef()
    const requestorTemplateEditorRef = useRef()

    const addTextToEditor = (editorName, htmlTemplate) => {
        const editorRef = editorName.current.getEditor()

        console.log(editorRef.getSelection())
        let oldHTML = `${editorRef.root.innerHTML}`
        let newHTML = `${oldHTML}<p><br></p>${htmlTemplate}`
        editorRef.clipboard.dangerouslyPasteHTML(newHTML)
    }

    return (
        <RichTextContext.Provider
            value={{
                mainEditorRef,
                attachmentsEditorRef,
                requestorTemplateEditorRef,
                mainEditorValue,
                setMainEditorValue,
                attachmentsEditorValue,
                setAttachmentsEditorValue,
                requestorTemplateEditorValue,
                setRequestorTemplateEditorValue,
                addTextToEditor,
            }}
        >
            {children}
        </RichTextContext.Provider>
    )
}
