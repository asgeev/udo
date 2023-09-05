import { useContext } from 'react'
import { Button, Space } from 'antd'
import { RichTextContext } from '@providers/RichTextProvider'
import {
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
    template8,
    template9,
    template10,
    template11,
    template12,
} from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const PasteButtons = () => {
    const { mainEditorRef, addTextToEditor } = useContext(RichTextContext)
    return (
        <Space direction="vertical" style={{ marginBottom: 15 }}>
            <Space wrap>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template1)}
                >
                    Szanowny Panie...
                </Button>
            </Space>
            <Space wrap>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template2)}
                >
                    Informacja o leczeniu
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template5)}
                >
                    Informacja o leczeniu 2
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template9)}
                >
                    Informacja o leczeniu 2 zał.
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template3)}
                >
                    Ubezpieczenie
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template4)}
                >
                    Dane adresowe
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template6)}
                >
                    Realizacja recept
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template7)}
                >
                    Ubezpieczenie zdrowotne
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template8)}
                >
                    Deklaracja POZ
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template10)}
                >
                    Wyjaśnienie CWU
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template11)}
                >
                    Dane zweryfikowane
                </Button>
                <Button
                    onClick={() => addTextToEditor(mainEditorRef, template12)}
                >
                    Przetwarzanie danych
                </Button>
            </Space>
        </Space>
    )
}
