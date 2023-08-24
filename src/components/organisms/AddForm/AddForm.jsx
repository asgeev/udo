import { Form, Button, Col, Row, Divider, Spin, Space } from 'antd'
import 'dayjs/locale/pl'
import { GridWrapper, antIcon } from './AddFrom.styles'
//Import form sections
import { InflowFormSection } from '@molecules/formSections/InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '@molecules/formSections/PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '@molecules/formSections/CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '@molecules/formSections/ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '@molecules/formSections/EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '@molecules/formSections/AdditionalInfoFormSection/AdditionalInfoFormSection'

export const AddForm = ({
    onSubmit,
    onFinishFailed,
    loading,
    formDisabled,
    setError,
    form,
}) => {
    return (
        <>
            {/* <Link to="/podglad" state={{ recordId: 111 }}>
                show record 2
            </Link> */}
            <Form
                form={form}
                name="mainAddForm"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={formDisabled}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                // onValuesChange={(changedValues) => {
                //     console.log(changedValues)
                // }}
                layout="vertical"
            >
                <GridWrapper>
                    <InflowFormSection />
                    <Divider />
                    <PersonDataFormSection />
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
                                {loading && <Spin indicator={antIcon} />}
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
