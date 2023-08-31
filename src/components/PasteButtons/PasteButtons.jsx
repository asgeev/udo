import { useContext } from 'react'
import { Button, Space } from 'antd'
import { RichTextContext } from '../Providers/RichTextProvider/RichTextProvider'
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
} from '../RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const PasteButtons = () => {
    const { mainEditor, addTextToEditor } = useContext(RichTextContext)
    return (
        <Space direction="vertical">
            <Space wrap>
                <Button onClick={() => addTextToEditor(mainEditor, template1)}>
                    Szanowny Panie...
                </Button>
            </Space>
            <Space wrap>
                <Button onClick={() => addTextToEditor(mainEditor, template2)}>
                    Informacja o leczeniu
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template5)}>
                    Informacja o leczeniu 2
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template9)}>
                    Informacja o leczeniu 2 zał.
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template3)}>
                    Ubezpieczenie
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template4)}>
                    Dane adresowe
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template6)}>
                    Realizacja recept
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template7)}>
                    Ubezpieczenie zdrowotne
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template8)}>
                    Deklaracja POZ
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template10)}>
                    Wyjaśnienie CWU
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template11)}>
                    Dane zweryfikowane
                </Button>
                <Button onClick={() => addTextToEditor(mainEditor, template12)}>
                    Przetwarzanie danych
                </Button>
            </Space>
        </Space>
    )
}
