import { useContext } from 'react'
import { Form, Button, Col, Row, Divider, Spin, Space, Alert } from 'antd'
import { EditFormContext } from '@providers/EditFormProvider'
import { InflowFormSection } from '@molecules/formSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/formSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/formSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSectionEditMode } from '@molecules/formSections/ReplyTemplateFormSectionEditMode/ReplyTemplateFormSectionEditMode'
import { EzdDataFormSection } from '@molecules/formSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/formSections/AdditionalInfoFormSection/AdditionalInfoFormSection'
import { downloadFile } from '@helpers/downloadFile'

export const EditForm = () => {
    const {
        error,
        setError,
        editForm,
        editMode,
        onSubmit,
        submitLoading,
        onFinishFailed,
        formDisabled,
        onChange,
        recordId,
    } = useContext(EditFormContext)

    return (
        <>
            {error && (
                <Alert
                    message="Ups! Wystąpił błąd"
                    description="Podczas pobierania danych formularza wystapił błąd, spróbuj przeładować stronę naciskając przyciski CTRL + F5. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony."
                    type="error"
                    showIcon
                />
            )}
            <Form
                form={editForm}
                name="mainEditForm"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={formDisabled}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                // onValuesChange={(changedValues) => {
                //     console.log(changedValues)
                // }}
                onFieldsChange={onChange}
                layout="vertical"
            >
                <InflowFormSection editMode={editMode} setError={setError} />
                <Divider />
                <PersonDataFormSection
                    editMode={editMode}
                    setError={setError}
                />
                <Divider />
                <CompanyDataFormSection
                    editMode={editMode}
                    setError={setError}
                />
                <Divider />
                <ReplyTemplateFormSectionEditMode
                    editMode={editMode}
                    setError={setError}
                />
                <Divider />
                <EzdDataFormSection editMode={editMode} setError={setError} />
                <Divider />
                <AdditionalInfoFormSection
                    editMode={editMode}
                    setError={setError}
                />

                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => downloadFile(recordId)}
                                >
                                    Wygeneruj plik
                                </Button>
                                <Button
                                    type="primary"
                                    loading={submitLoading}
                                    htmlType="submit"
                                    size="large"
                                >
                                    Zapisz
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
