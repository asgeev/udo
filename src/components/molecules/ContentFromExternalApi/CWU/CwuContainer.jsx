import { Space, Card, Button, Alert, Divider } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import {
    template2,
    template4,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'
import { useRichTextContext } from '@hooks/useRichTextContext'

export const CwuContainer = () => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useRichTextContext

    return (
        <>
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
                    </p>
                    <ol>
                        <li>adres zamieszkania...</li>
                        <li>adres zameldowania...</li>

                        <li>adres do korespondencji...</li>
                    </ol>
                </Card>
                <Divider plain>więcej już niedługo</Divider>
            </Space>
        </>
    )
}
