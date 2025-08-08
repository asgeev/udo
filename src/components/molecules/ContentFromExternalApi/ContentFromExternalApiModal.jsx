import { useState } from 'react'
import { Button, Modal, Form, Flex, message, Typography, Alert } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useExternalSystems } from '@hooks/useExternalSystems'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import ContentFromExternalApiCheckboxes from './ContentFromExternalApiCheckboxes'
import { useContentFromExternalApiMutation } from '@hooks/useContentFromExternalApiMutation'
import { useEditFormContext } from '@hooks/useEditFormContext'
import EmptyFieldsAlert from '@atoms/EmptyFieldsAlert/EmptyFieldsAlert'

const ContentFromExternalApiModal = () => {
    const [open, setOpen] = useState(false)

    const { editForm } = useEditFormContext()
    const [form] = Form.useForm()

    const { currentRecordId } = useRecordsViewContext()

    const { data } = useExternalSystems(currentRecordId)

    const { mutateAsync, isPending } =
        useContentFromExternalApiMutation(currentRecordId)

    //Get values from edit form
    const firstName = Form.useWatch('first_name', editForm)
    const lastName = Form.useWatch('last_name', editForm)
    const pesel = Form.useWatch('pesel', editForm)

    const externalSystemsCheckbox = Form.useWatch(
        'external_systems_checkbox',
        form
    )

    const isListEmpty = externalSystemsCheckbox?.length > 0

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
        console.log(values)
        try {
            await mutateAsync(values)
            handleCancel()
            showMessage().success('Przesłano do realizacji')
            form.resetFields()
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
                title="Wybierz zadania które chcesz zlecić"
                onOk={form.submit}
                onCancel={handleCancel}
                width={700}
                okText="Dodaj"
                okButtonProps={{ disabled: !isListEmpty }}
            >
                {!firstName || !lastName || !pesel ? (
                    <EmptyFieldsAlert />
                ) : (
                    <Flex vertical style={{ marginTop: 16 }} gap={16}>
                        <Alert
                            message={
                                <Typography.Text style={{ fontSize: 12 }}>
                                    {firstName} {lastName}, pesel: {pesel}
                                </Typography.Text>
                            }
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

                            <ContentFromExternalApiCheckboxes
                                data={data}
                                inputName={'external_systems_checkbox'}
                                form={form}
                            />
                        </Form>
                    </Flex>
                )}
            </Modal>
        </>
    )
}
export default ContentFromExternalApiModal
