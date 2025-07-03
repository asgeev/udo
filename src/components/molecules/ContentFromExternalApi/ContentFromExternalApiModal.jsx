import { useState } from 'react'
import { Button, Modal, Form, Alert, Space, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useExternalSystems } from '@hooks/useExternalSystems'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import ContentFromExternalApiCheckboxes from './ContentFromExternalApiCheckboxes'
import { useContentFromExternalApiMutation } from '@hooks/useContentFromExternalApiMutation'
import { useEditFormContext } from '@hooks/useEditFormContext'

const ContentFromExternalApiModal = () => {
    const [open, setOpen] = useState(false)

    const { editForm } = useEditFormContext()
    const [form] = Form.useForm()

    const { currentRecordId } = useRecordsViewContext()

    const { data } = useExternalSystems(currentRecordId)

    const { mutateAsync, isPending } =
        useContentFromExternalApiMutation(currentRecordId)

    //Get values from edit form
    const firstName = editForm.getFieldValue('first_name')
    const lastName = editForm.getFieldValue('last_name')
    const pesel = editForm.getFieldValue('pesel')

    const externalSystemsCheckbox = Form.useWatch(
        'external_systems_checkbox',
        form
    )
    const isChecked = externalSystemsCheckbox?.some(
        (item) => item.checked === true
    )

    const showModal = () => {
        setOpen(true)
    }

    const showMessage = () => {
        return message
    }

    const handleCancel = () => {
        setOpen(false)
        form.resetFields()
    }

    const onSubmit = async (values) => {
        try {
            await mutateAsync(values)
            handleCancel()
            showMessage().success('Przesłano do realizacji')
        } catch (err) {
            console.error(err)
            showMessage().error(
                'Wystąpił błąd podczas wysyłania, spróbuj ponownie później!'
            )
        }
    }

    return (
        <>
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={showModal}
            >
                Dodaj kolejne
            </Button>
            <Modal
                open={open}
                confirmLoading={isPending}
                title="Wybierz pytania które chcesz dodać"
                onOk={form.submit}
                onCancel={handleCancel}
                width={700}
                okText="Prześlij"
                okButtonProps={{ disabled: !isChecked }}
            >
                <Space direction="vertical">
                    <Alert
                        message="Dane osoby"
                        type="info"
                        showIcon
                        description={`${firstName} ${lastName}, pesel: ${pesel}`}
                    />

                    <Form
                        name="ContentFromExternalApi"
                        onFinish={onSubmit}
                        form={form}
                        initialValues={{
                            first_name: firstName,
                            last_name: lastName,
                            pesel: pesel,
                        }}
                    >
                        <Form.Item name="first_name" hidden />

                        <Form.Item name="last_name" hidden />

                        <Form.Item name="pesel" hidden />

                        <ContentFromExternalApiCheckboxes data={data} />
                    </Form>
                </Space>
            </Modal>
        </>
    )
}
export default ContentFromExternalApiModal
