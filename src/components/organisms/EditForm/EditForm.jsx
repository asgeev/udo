import { Form, Button, Col, Row, Divider, Space, Alert, Spin } from 'antd'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { InflowFormSection } from '@molecules/FormSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/FormSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/FormSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSectionEditMode } from '@molecules/FormSections/ReplyTemplateFormSectionEditMode/ReplyTemplateFormSectionEditMode'
import { EzdDataFormSection } from '@molecules/FormSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/FormSections/AdditionalInfoFormSection/AdditionalInfoFormSection'
import { EditFormSkeleton } from '@molecules/EditFormSkeleton/EditFormSkeleton'
//Import icons
import { SaveOutlined, DownloadOutlined } from '@ant-design/icons'

export const EditForm = () => {
    const {
        initalData,
        isDataLoading,
        onSubmit,
        onFinishFailed,
        onValuesChange,
        setFormError,
        saveFormAndDownloadFile,
        editForm,
        formError,
        editMode,
        isFormSubmitting,
    } = useEditFormContext()

    return (
        <>
            {formError && (
                <Alert
                    message="Ups! Wystąpił błąd"
                    description="Podczas pobierania danych formularza wystapił błąd, spróbuj przeładować stronę naciskając przyciski CTRL + F5. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony."
                    type="error"
                    showIcon
                />
            )}
            {isDataLoading && <EditFormSkeleton />}

            {initalData && (
                <Form
                    form={editForm}
                    name="mainEditForm"
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={initalData}
                    scrollToFirstError={{
                        block: 'center',
                        behavior: 'smooth',
                    }}
                    onValuesChange={(changedValues) => {
                        onValuesChange(changedValues)
                    }}
                    layout="vertical"
                >
                    <Spin spinning={isFormSubmitting}>
                        <InflowFormSection
                            editMode={editMode}
                            setError={setFormError}
                        />
                        <Divider />
                        <PersonDataFormSection
                            editMode={editMode}
                            setError={setFormError}
                        />
                        <Divider />
                        <CompanyDataFormSection
                            editMode={editMode}
                            setError={setFormError}
                        />
                        <Divider />
                        <ReplyTemplateFormSectionEditMode
                            editMode={editMode}
                            setError={setFormError}
                        />
                        <Divider />
                        <EzdDataFormSection
                            editMode={editMode}
                            setError={setFormError}
                            form={editForm}
                        />
                        <Divider />
                        <AdditionalInfoFormSection
                            editMode={editMode}
                            setError={setFormError}
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
                                            icon={<DownloadOutlined />}
                                        >
                                            Zapisz i wygeneruj plik
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            icon={<SaveOutlined />}
                                        >
                                            Zapisz
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Spin>
                </Form>
            )}
        </>
    )
}
