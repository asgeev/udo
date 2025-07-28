import ReactQuill from 'react-quill'
//Import contexts
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { useGetSignatureListQuery } from '@hooks/useGetSignatureListQuery'
import {
    Form,
    Select,
    Space,
    Button,
    Tabs,
    Collapse,
    Divider,
    Flex,
    Spin,
} from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    AndroidOutlined,
} from '@ant-design/icons'
//Import components
import { FormSection } from '@molecules/FormSection/FormSection'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'
import { UploadFile } from '@molecules/UploadFile/UploadFile'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { AttachmentsList } from '@molecules/Attachments/AttachmentList'
import { AttachmentItem } from '@molecules/Attachments/AttachmentItem'
import {
    useAttachments,
    useDeleteAttachment,
    useGetAttachmentUrl,
} from '@hooks/useAttachments'

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useSecondDrawerContext()
    const { mainEditorRef } = useRichTextContext()
    const { formDisabled, messageApi } = useEditFormContext()
    const { currentRecordId } = useRecordsViewContext()

    //Fetch inflow way list
    const { data, isError } = useGetSignatureListQuery()

    //Set global error state
    isError && setError(true)

    const { data: attachements, isLoading } = useAttachments(currentRecordId)
    const filteredAttachements = attachements?.filter(
        ({ status }) => status === 'OK'
    )

    //Delete file
    const { mutateAsync: deleteAttachmentMutate } = useDeleteAttachment()

    const deleteAttachment = async ({ id }) => {
        messageApi.open({
            type: 'loading',
            content: 'Usuwanie pliku',
            duration: 0,
        })
        try {
            await deleteAttachmentMutate(id)
            messageApi.destroy()
            return messageApi.success('Plik został usunięty')
        } catch (err) {
            console.error('Error', err)
            messageApi.destroy()
            messageApi.error(
                'Wystąpił błąd podczas usuwania, spróbuj ponownie później',
                4
            )
        }
    }

    //Get file url and open in new window
    const { mutateAsync: openAttachmentMutate } = useGetAttachmentUrl()

    const openAttachment = async ({ id }) => {
        messageApi.open({
            type: 'loading',
            content: 'Otwieranie pliku',
            duration: 0,
        })
        try {
            const { data } = await openAttachmentMutate(id)
            window.open(data?.link, '_blank')
            messageApi.destroy()
        } catch (err) {
            console.error('Error', err)
            messageApi.destroy()
            messageApi.error(
                'Wystąpił błąd podczas otwierania pliku, spróbuj ponownie później',
                4
            )
        }
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    }
    const collapseItems = [
        {
            key: '1',
            label: 'Rozwiń, aby dodać szablon do treści',
            children: <PasteButtons />,
        },
    ]
    const tabsItems = [
        {
            key: 1,
            label: (
                <span>
                    <SisternodeOutlined />
                    Odpowiedź
                </span>
            ),
            forceRender: true,
            children: (
                <>
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: '100%', marginBottom: 10 }}
                    >
                        <Collapse ghost size="small" items={collapseItems} />
                    </Space>
                    <Form.Item name="template_main_text">
                        <ReactQuill
                            id="afg"
                            ref={mainEditorRef}
                            modules={modules}
                            readOnly={formDisabled}
                            placeholder="Tutaj wpisz swoją odpowiedź"
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            key: 2,
            label: (
                <span>
                    <PaperClipOutlined />
                    Załączniki
                </span>
            ),
            forceRender: true,
            children: (
                <Flex vertical gap={8}>
                    <UploadFile />
                    <Spin spinning={isLoading}>
                        <AttachmentsList
                            attachements={filteredAttachements}
                            renderItem={(item) => (
                                <AttachmentItem
                                    item={item}
                                    onOpen={openAttachment}
                                    onDelete={deleteAttachment}
                                />
                            )}
                        />
                    </Spin>
                </Flex>
            ),
        },
        {
            key: 3,
            label: (
                <span>
                    <IdcardOutlined />
                    Adresat
                </span>
            ),
            disabled: true,
        },
    ]

    return (
        <FormSection
            editMode={editMode}
            sectionName={
                <Flex justify="space-between">
                    Dane szablonu odpowiedzi
                    <Button
                        icon={<AndroidOutlined />}
                        title="Pokaż zadania dla robota"
                        type="primary"
                        onClick={(e) => {
                            e.preventDefault()
                            openSecondDrawer(1)
                        }}
                    >
                        Odpowiedzi
                    </Button>
                </Flex>
            }
            subTitle={'Wpisz poniżej odpowiedź która znajdzie się na piśmie'}
        >
            <Tabs items={tabsItems} animated />
            <Divider />

            <Form.Item
                name="signature_id"
                label="Podpis na piśmie"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Wybierz podpis który znajdzie się na piśmie',
                    },
                ]}
            >
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz podpis"
                    allowClear
                    options={data}
                />
            </Form.Item>
        </FormSection>
    )
}
