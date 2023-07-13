import {
    Form,
    Input,
    Typography,
    Space,
    Button,
    DatePicker,
    Select,
    Radio,
    Col,
    Row,
} from 'antd'
import { InflowFormSection } from '../InflowFromSection/InflowFormSection'
import { PersonDataFormSection } from '../PersonDataFormSection/PersonDataFormSection'
import { CompanyDataFormSection } from '../CompanyDataFormSection/CompanyDataFormSection'
import { ReplyTemplateFormSection } from '../ReplyTemplateFormSection/ReplyTemplateFormSection'
import { EzdDataFormSection } from '../EzdDataFormSection/EzdDataFormSection'
import { AdditionalInfoFormSection } from '../AdditionalInfoFormSection/AdditionalInfoFormSection'

export const AddForm = ({
    onSubmit,
    onFinishFailed,
    loading,
    onSelect,
    initialValues = {},
    formDisabled,
    apiData,
}) => {
    const { Title } = Typography

    console.log(apiData)

    return (
        <>
            <Form
                name="mainAddForm"
                initialValues={initialValues}
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
                <Title style={{ marginBottom: 60, marginTop: 30 }} level={2}>
                    Zarejestruj zapytanie
                </Title>

                <InflowFormSection />
                <PersonDataFormSection />
                <CompanyDataFormSection onSelect={onSelect} />
                <ReplyTemplateFormSection />
                <EzdDataFormSection />
                <AdditionalInfoFormSection />

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
