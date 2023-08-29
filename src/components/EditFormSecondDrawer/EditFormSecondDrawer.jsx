import { useContext } from 'react'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
import { Drawer } from 'antd'
import {
    templateText1,
    templateText2,
} from '../RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const EditFormSecondDrawer = ({
    secondDrawerOpen,
    onSecondDrawerClose,
}) => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useContext(RichTextContext)

    return (
        <Drawer
            width={400}
            title="Dane z systemu"
            open={secondDrawerOpen}
            onClose={onSecondDrawerClose}
        >
            <button
                onClick={() =>
                    addTextToEditor(event, templateText1, mainEditor)
                }
            >
                Szablon 1
            </button>
            <button
                onClick={() =>
                    addTextToEditor(event, templateText1, attachmentsEditor)
                }
            >
                Szablon 2
            </button>
        </Drawer>
    )
}
