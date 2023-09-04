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
    const context = useContext(EditFormContext)

    return (
        <>
            {context.error && (
                <Alert
                    message="Ups! Wystąpił błąd"
                    description="Podczas pobierania danych formularza wystapił błąd, spróbuj przeładować stronę naciskając przyciski CTRL + F5. Jeżeli problem będzie występował nadal prosimy o kontakt z administratorami strony."
                    type="error"
                    showIcon
                />
            )}
            <Form
                form={context.editForm}
                name="mainEditForm"
                onFinish={context.onSubmit}
                onFinishFailed={context.onFinishFailed}
                autoComplete="off"
                disabled={context.formDisabled}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                // onValuesChange={(changedValues) => {
                //     console.log(changedValues)
                // }}
                onFieldsChange={context.onChange}
                layout="vertical"
            >
                <InflowFormSection />
                <Divider />
                <PersonDataFormSection editMode />
                <Divider />
                <CompanyDataFormSection editMode />
                <Divider />
                <ReplyTemplateFormSectionEditMode editMode />
                <Divider />
                <EzdDataFormSection editMode />
                <Divider />
                <AdditionalInfoFormSection editMode />

                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() =>
                                        downloadFile(context.recordId)
                                    }
                                >
                                    Wygeneruj plik
                                </Button>
                                <Button
                                    type="primary"
                                    loading={context.onSubmitLoading}
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
