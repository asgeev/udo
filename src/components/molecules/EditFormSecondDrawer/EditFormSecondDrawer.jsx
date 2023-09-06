import { useContext } from 'react'
import { Drawer, Button, Space, Alert } from 'antd'
import { RichTextContext } from '@providers/RichTextProvider'
import {
    template2,
    template4,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'
import { useEditDrawerContext } from '@hooks/useEditDrawerContext'

export const SecondDrawer = () => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useContext(RichTextContext)
    const { isSecondDrawerVisible, closeSecondDrawer } = useEditDrawerContext()

    return (
        <Drawer
            width={600}
            title="Dane z systemu"
            open={isSecondDrawerVisible}
            onClose={closeSecondDrawer}
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
