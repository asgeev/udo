import { Form, Button, Col, Row, Divider } from 'antd'
import { InflowFormSection } from '../InflowFromSection/InflowFormSection'
import { PersonDataFormSection } from '../PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '../CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '../ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '../EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '../AdditionalInfoFormSection/AdditionalInfoFormSection'
import styled from 'styled-components'

const GridWrapper = styled.div`
    /* border: 1px solid #edf2f4; */
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 10px;
    padding-top: 24px;
`

export const AddForm = ({
    onSubmit,
    onFinishFailed,
    loading,
    formDisabled,
    setError,
}) => {
    const [form] = Form.useForm()

    return (
        <>
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
                    <CompanyDataFormSection />
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
                            <Button
                                type="primary"
                                loading={loading}
                                htmlType="submit"
                            >
                                Zapisz szablon
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
