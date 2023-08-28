import { useContext, useLayoutEffect } from 'react'
import { EditFormContext } from '../EditFormProvider/EditFormProvider'
import { Form, Button, Col, Row, Divider, Spin, Space } from 'antd'
import { InflowFormSection } from '../InflowFormSection/InflowFormSection'
import { PersonDataFormSection } from '../PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '../CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSectionEditMode } from '../ReplyTemplateFormSectionEditMode/ReplyTemplateFormSectionEditMode'
import { EzdDataFormSection } from '../EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '../AdditionalInfoFormSection/AdditionalInfoFormSection'
import { downloadFile } from '../../helpers/downloadFile'
import { useAuthUser } from 'react-auth-kit'

export const EditForm = () => {
    const context = useContext(EditFormContext)

    return (
        <>
            <Form
                form={context.editForm}
                name="mainEditForm"
                onFinish={context.onSubmit}
                onFinishFailed={context.onFinishFailed}
                autoComplete="off"
                disabled={context.formDisabled}
                scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                onValuesChange={(changedValues) => {
                    console.log(changedValues)
                }}
                onFieldsChange={context.onChange}
                layout="vertical"
            >
                <InflowFormSection editMode />
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
