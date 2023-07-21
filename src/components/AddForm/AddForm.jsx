import { Form, Button, Col, Row, Divider, Spin, Space } from 'antd'
import { InflowFormSection } from '../InflowFromSection/InflowFormSection'
import { PersonDataFormSection } from '../PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '../CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '../ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '../EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '../AdditionalInfoFormSection/AdditionalInfoFormSection'
import { LoadingOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const GridWrapper = styled.div`
    background-color: #fdfdfd;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 10px;
    padding-top: 24px;
`

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
)

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
