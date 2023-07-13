import { FormSection } from '../FormSection/FormSection'
import { Form, Row, Col, Select, Input } from 'antd'

export const ReplyTemplateFormSection = () => {
    const { TextArea } = Input

    return (
        <FormSection sectionName="Dane szablonu odpowiedzi">
            <Row gutter={[8, 0]}>
                <Col span={12}>
                    <Form.Item
                        name="company_type_id"
                        label="Podstawa prawna dla"
                        rules={[
                            {
                                type: 'number',
                                required: true,
                                message: 'Wybierz podstawę prawną odpowiedzi',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="podstawa prawna dla"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 1,
                                    label: 'Bank',
                                },
                                {
                                    value: 2,
                                    label: 'Ośrodek pomocy społecznej',
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="act_signature" label="Sygnatura akt">
                        <Input placeholder="sygnatura akt" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Cel udostępnienia"
                name="reason_of_request"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'cel udostępnienia',
                    },
                ]}
            >
                <Input placeholder="wpisz cel udostępnienia" />
            </Form.Item>
            <Form.Item name="template_main_text" label="Odpowiedź">
                <TextArea></TextArea>
            </Form.Item>
        </FormSection>
    )
}
