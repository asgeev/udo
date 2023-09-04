import { useContext } from 'react'
import { Form, Button, Col, Row, Divider, Spin, Space, Alert } from 'antd'
import 'dayjs/locale/pl'
import { GridWrapper, antIcon } from './AddFrom.styles'
import { AddFormContext } from '@providers/AddFormProvider'
//Import form sections
import { InflowFormSection } from '@molecules/formSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/formSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/formSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '@molecules/formSections/ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '@molecules/formSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/formSections/AdditionalInfoFormSection/AdditionalInfoFormSection'

export const AddForm = () => {
    const {
        error,
        setError,
        addForm,
        onSubmit,
        onFinishFailed,
        formDisabled,
        submitLoading,
    } = useContext(AddFormContext)

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
                form={addForm}
                name="mainAddForm"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={formDisabled}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                layout="vertical"
            >
                <GridWrapper>
                    <InflowFormSection setError={setError} />
                    <Divider />
                    <PersonDataFormSection setError={setError} />
                    <Divider />
                    <CompanyDataFormSection setError={setError} />
                    <Divider />
                    <ReplyTemplateFormSection setError={setError} />
                    <Divider />
                    <EzdDataFormSection setError={setError} />
                    <Divider />
                    <AdditionalInfoFormSection setError={setError} />
                </GridWrapper>
                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Space>
                                {submitLoading && <Spin indicator={antIcon} />}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    Zapisz szablon
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}