import { Space, Card, Button, Alert, Divider } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import {
    template4,
    template7,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'
import { useRichTextContext } from '@hooks/useRichTextContext'

export const CwuContainer = ({ data = {} }) => {
    const { addTextToEditor, mainEditor, attachmentsEditor } =
        useRichTextContext()

    const templateUbezpieczenie = template7(data)
    const templateDaneAdresowe = template4(data)

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size={30}>
                <Card
                    title="Ubezpieczenie zdrowotne"
                    extra={
                        <Button
                            icon={<CopyOutlined />}
                            onClick={() =>
                                addTextToEditor(
                                    mainEditor,
                                    templateDaneAdresowe
                                )
                            }
                        >
                            kopuj
                        </Button>
                    }
                    style={{
                        width: '100%',
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: templateUbezpieczenie,
                        }}
                    ></div>
                </Card>
                <Card
                    title="Dane adresowe"
                    extra={
                        <Button
                            icon={<CopyOutlined />}
                            onClick={() =>
                                addTextToEditor(
                                    mainEditor,
                                    templateDaneAdresowe
                                )
                            }
                        >
                            kopuj
                        </Button>
                    }
                    style={{
                        width: '100%',
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: templateDaneAdresowe,
                        }}
                    ></div>
                </Card>
                <Divider plain>więcej już niedługo</Divider>
            </Space>
        </>
    )
}
