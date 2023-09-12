import { Drawer, Button, Space, Alert, Card, Divider } from 'antd'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useEditDrawerContext } from '@hooks/useEditDrawerContext'
import { CopyOutlined } from '@ant-design/icons'
import {
    template2,
    template4,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const SecondDrawer = () => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useRichTextContext
    const { isSecondDrawerVisible, closeSecondDrawer } = useEditDrawerContext()

    return (
        <Drawer
            width={600}
            title="Dane z systemu"
            open={isSecondDrawerVisible}
            onClose={closeSecondDrawer}
        >
            <Space direction="vertical" style={{ width: '100%' }} size={30}>
                <Alert
                    message="Tutaj będą wyświetlały się dane z CWU. Po kliknięciu w przycisk 'kopuj', szablon zostanie wypełniony danymi z CWU i wstawiony do głównego edytora"
                    type="info"
                    showIcon
                />
                <Card
                    title="Ubezpieczenie zdrowotne"
                    extra={
                        <Button
                            disabled
                            icon={<CopyOutlined />}
                            onClick={() =>
                                addTextToEditor(mainEditor, template4)
                            }
                        >
                            kopuj
                        </Button>
                    }
                    style={{
                        width: '100%',
                    }}
                >
                    <p>
                        Według stanu na XX.XX.XXXX r. Pani/Pan XXX XXXXXX
                        podlega / nie podlega ubezpieczeniu zdrowotnemu w
                        Rzeczypospolitej Polskiej z tytułu pobierania emerytury
                        lub renty Udostępnione informacje podlegają ochronie
                    </p>
                </Card>
                <Card
                    title="Dane adresowe"
                    extra={
                        <Button
                            disabled
                            icon={<CopyOutlined />}
                            onClick={() =>
                                addTextToEditor(mainEditor, template2)
                            }
                        >
                            kopuj
                        </Button>
                    }
                    style={{
                        width: '100%',
                    }}
                >
                    <p>
                        W Centralnym Wykazie Ubezpieczonych widnieją następujące
                        adresy ww. osoby:
                        <ol>
                            <li>adres zamieszkania...</li>
                            <li>adres zameldowania...</li>

                            <li>adres do korespondencji...</li>
                        </ol>
                    </p>
                </Card>
                <Divider plain>więcej już niedługo</Divider>
            </Space>
        </Drawer>
    )
}
