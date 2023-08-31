import { useContext } from 'react'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
import { Drawer, Button, Space, Alert } from 'antd'
import {
    template2,
    template4,
} from '../RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const EditFormSecondDrawer = ({
    secondDrawerOpen,
    onSecondDrawerClose,
}) => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useContext(RichTextContext)

    return (
        <Drawer
            width={600}
            title="Dane z systemu"
            open={secondDrawerOpen}
            onClose={onSecondDrawerClose}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                    message="Tutaj będą wyświetlały się dane z CWU. Po kliknięciu w przycisk, szablon zostanie wypełniony danymi z CWU i wstawiony do głównego edytora"
                    type="info"
                    showIcon
                />
                <Space>
                    <Button
                        onClick={() => addTextToEditor(mainEditor, template2)}
                    >
                        Dane z CWU 1
                    </Button>
                    <br />

                    <Button
                        onClick={() => addTextToEditor(mainEditor, template4)}
                    >
                        Dane z CWU 2
                    </Button>
                </Space>
            </Space>
        </Drawer>
    )
}
