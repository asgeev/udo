import { useRef, createContext } from 'react'

export const RichTextContext = createContext({
    mainEditor: null,
    attachmentsEditor: null,
    requestorTemplateEditor: null,
    addTextToEditor: () => {},
    handleChangeContent: () => {},
    setInitialValues: () => {},
})

export const RichTextProvider = ({ children }) => {
    const mainEditor = useRef()
    const attachmentsEditor = useRef()
    const requestorTemplateEditor = useRef()

    const addTextToEditor = (event, delta, destinationEditor, data) => {
        event.preventDefault()
        console.log(destinationEditor)
        const editor = destinationEditor?.current?.getEditor()
        const selection = editor?.getSelection(true)
        editor?.updateContents(delta(selection, data))
    }

    const handleChangeContent = (editor, form, fieldName) => {
        form?.setFieldValue(fieldName, editor.getHTML())
    }

    const setInitialValues = (values, editorName, editForm) => {
        const editor = editorName?.current?.getEditor()
        editor?.clipboard?.dangerouslyPasteHTML(values)
        /*Fix scrool behavior when pass value to richtext editor */
        editForm.scrollToField('rpw', { block: 'center' })
    }

    return (
        <RichTextContext.Provider
            value={{
                mainEditor,
                attachmentsEditor,
                requestorTemplateEditor,
                addTextToEditor,
                handleChangeContent,
                setInitialValues,
            }}
        >
            {children}
        </RichTextContext.Provider>
    )
}
