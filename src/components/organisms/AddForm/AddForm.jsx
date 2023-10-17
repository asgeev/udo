import { Form, Button, Col, Row, Divider, Spin, Space, Alert } from 'antd'
import 'dayjs/locale/pl'
import { GridWrapper, antIcon } from './AddFrom.styles'
//Import form sections
import { InflowFormSection } from '@molecules/FormSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/FormSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/FormSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '@molecules/FormSections/ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '@molecules/FormSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/FormSections/AdditionalInfoFormSection/AdditionalInfoFormSection'
import { useAddFormContext } from '@hooks/useAddFormContext'

export const AddForm = () => {
    const {
        error,
        setError,
        addForm,
        onSubmit,
        onFinishFailed,
        submitLoading,
        updateEzdNameValue,
    } = useAddFormContext()

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
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                layout="vertical"
            >
                <Spin spinning={submitLoading} size="large">
                    <GridWrapper>
                        <InflowFormSection setError={setError} />
                        <Divider />
                        <PersonDataFormSection setError={setError} />
                        <Divider />
                        <CompanyDataFormSection setError={setError} />
                        <Divider />
                        <ReplyTemplateFormSection setError={setError} />
                        <Divider />
                        <EzdDataFormSection
                            setError={setError}
                            form={addForm}
                            updateEzdNameValue={updateEzdNameValue}
                        />
                        <Divider />
                        <AdditionalInfoFormSection setError={setError} />
                    </GridWrapper>
                </Spin>
                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Space>
                                {submitLoading && <Spin indicator={antIcon} />}
                                <Button
                                    id="saveAddFrom"
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
