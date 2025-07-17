import { Upload, Button, message } from 'antd'
import { useFileUpload } from '@hooks/useFileUpload'
import { UploadOutlined } from '@ant-design/icons'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const UploadFile = (props) => {
    const { mutateAsync: uploadAsync } = useFileUpload()
    const [messageApi, messageContext] = message.useMessage()
    const { currentRecordId } = useRecordsViewContext()
    const maxFileSize = 100 //MB

    return (
        <>
            {messageContext}
            <Upload
                {...props}
                fileList={[]}
                beforeUpload={(file) => {
                    const isTooLarge = file?.size > 1024 * 1024 * maxFileSize

                    if (isTooLarge) {
                        messageApi.error(
                            `Plik jest zbyt duży, maksymalna wielkość ${maxFileSize} MB`
                        )
                        return false
                    }
                }}
                customRequest={async ({ file }) => {
                    messageApi.loading('Przesyłanie pliku')
                    try {
                        await uploadAsync({ file, currentRecordId })
                        messageApi.destroy()
                        return messageApi.success('Plik został przesłany')
                    } catch (err) {
                        console.error('Error', err)
                        messageApi.destroy()
                        messageApi.error(
                            'Wystąpił błąd podczas przesyłania, spróbuj ponownie później',
                            4
                        )
                    }
                }}
            >
                <Button icon={<UploadOutlined />}>Prześlij plik</Button>
            </Upload>
        </>
    )
}
