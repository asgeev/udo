import { Form, Button, Col, Row, Divider, Spin, Space, Alert } from 'antd'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { InflowFormSection } from '@molecules/FormSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/FormSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/FormSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSectionEditMode } from '@molecules/FormSections/ReplyTemplateFormSectionEditMode/ReplyTemplateFormSectionEditMode'
import { EzdDataFormSection } from '@molecules/FormSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/FormSections/AdditionalInfoFormSection/AdditionalInfoFormSection'

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
        dataLoading,
        saveFormAndDownloadFile,
    } = useEditFormContext()

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
            <Spin spinning={dataLoading} size="large">
                <Form
                    form={editForm}
                    name="mainEditForm"
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    disabled={formDisabled || error}
                    scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                    onValuesChange={(changedValues) => {
                        onChange(changedValues)
                    }}
                    // onFieldsChange={onChange}
                    layout="vertical"
                >
                    <InflowFormSection
                        editMode={editMode}
                        setError={setError}
                    />
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
                    <EzdDataFormSection
                        editMode={editMode}
                        setError={setError}
                        form={editForm}
                    />
                    <Divider />
                    <AdditionalInfoFormSection
                        editMode={editMode}
                        setError={setError}
                    />

                    <Row style={{ marginTop: 50 }} justify="end">
                        <Col>
                            <Form.Item>
                                <Space>
                                    <Button size="large" disabled>
                                        Zakończ
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={saveFormAndDownloadFile}
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
            </Spin>
        </>
    )
}
