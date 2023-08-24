import { useContext } from 'react'
import { EditFormContext } from '../EditFormProvider/EditFormProvider'
import { Form, Button, Col, Row, Divider, Spin, Space } from 'antd'
import { InflowFormSection } from '../InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '../PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '../CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSectionEditMode } from '../ReplyTemplateFormSectionEditMode/ReplyTemplateFormSectionEditMode'
import { EzdDataFormSection } from '../EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '../AdditionalInfoFormSection/AdditionalInfoFormSection'

export const EditForm = () => {
    const context = useContext(EditFormContext)
    const setError = null

    console.log(context)

    return (
        <>
            <Form
                form={context.editForm}
                name="mainEditForm"
                onFinish={context.onSubmit}
                onFinishFailed={context.onFinishFailed}
                autoComplete="off"
                disabled={context.formDisabled}
                initialValues={context.initialValues}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                // onValuesChange={(changedValues) => {
                //     console.log(changedValues)
                // }}
                layout="vertical"
            >
                <InflowFormSection editMode />
                <Divider />
                <PersonDataFormSection editMode />
                <Divider />
                <CompanyDataFormSection editMode setError={setError} />
                <Divider />
                <ReplyTemplateFormSectionEditMode
                    editMode
                    // setError={setError}
                />
                <Divider />
                <EzdDataFormSection editMode setError={setError} />
                <Divider />
                <AdditionalInfoFormSection editMode setError={setError} />

                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Space>
                                {/* {loading && <Spin indicator={antIcon} />} */}
                                <Button
                                    type="primary"
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
