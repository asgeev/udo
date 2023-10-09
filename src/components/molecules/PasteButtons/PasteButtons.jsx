import { Button, Space } from 'antd'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { mergeTemplateObject } from '@helpers/mergeTemplateObject'
import { templates } from '@molecules/RichTextEditor/TemplatesRichTextEditor/TemplatesRichTextEditor'

export const PasteButtons = () => {
    const { mainEditorRef, addTextToEditor } = useRichTextContext()

    const templatesArray = [
        templates.daneAdresowe(),
        templates.ubezpieczenieZdrowotne(),
    ]

    return (
        <Space direction="vertical" style={{ marginBottom: 15 }}>
            <Space wrap>
                <Button
                    onClick={() =>
                        addTextToEditor(
                            mainEditorRef,
                            mergeTemplateObject(templates.szanownyPanie())
                        )
                    }
                >
                    {templates.szanownyPanie().name}
                </Button>

                <Button
                    onClick={() =>
                        addTextToEditor(
                            mainEditorRef,
                            mergeTemplateObject(templates.szanowniPanstwo())
                        )
                    }
                >
                    {templates.szanowniPanstwo().name}
                </Button>
            </Space>
            <Space wrap>
                {templatesArray?.map((template, index) => {
                    console.log(template)
                    return (
                        <Button
                            key={index}
                            onClick={() =>
                                addTextToEditor(
                                    mainEditorRef,
                                    mergeTemplateObject(template)
                                )
                            }
                        >
                            {template?.name}
                        </Button>
                    )
                })}
            </Space>
        </Space>
    )
}
