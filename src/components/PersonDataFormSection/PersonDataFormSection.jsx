import { FormSection } from '../FormSection/FormSection'
import { Form, Input, Row, Col, Space, DatePicker } from 'antd'

export const PersonDataFormSection = () => {
    return (
        <FormSection sectionName="Dane osoby">
            <Form.Item label="Pesel" name="pesel">
                <Input placeholder="pesel" style={{ maxWidth: 200 }} />
            </Form.Item>
            <Form.Item
                label="Inne dane identyfikacyjne"
                name="other_identification_data"
            >
                <Input placeholder="inne dane identyfikacyjne" />
            </Form.Item>
            <Row gutter={[8, 0]}>
                <Col span={12}>
                    <Form.Item
                        label="Imię"
                        name="first_name"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                                message: 'Podaj imię osoby',
                            },
                        ]}
                    >
                        <Input placeholder="Imię" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Drugie imię" name="second_name">
                        <Input placeholder="drugie imie" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 0]}>
                <Col span={12}>
                    <Form.Item
                        label="Nazwisko"
                        name="last_name"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                                message: 'Podaj nazwisko osoby',
                            },
                        ]}
                    >
                        <Input placeholder="Nazwisko" />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Data urodzenia" name="birth_date">
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Adres">
                <Space direction="vertical" style={{ rowGap: 0 }}>
                    <Space direction="horizontal">
                        <Form.Item name="person_street">
                            <Input placeholder="ulica" style={{ width: 250 }} />
                        </Form.Item>

                        <Form.Item name="person_house">
                            <Input
                                placeholder="nr domu"
                                style={{ width: 120 }}
                            />
                        </Form.Item>
                        <Form.Item name="person_apartment">
                            <Input
                                placeholder="nr mieszkania"
                                style={{ maxWidth: 120 }}
                            />
                        </Form.Item>
                    </Space>
                    <Space direction="horizontal">
                        <Form.Item name="preson_postcode">
                            <Input placeholder="kod pocztowy" />
                        </Form.Item>
                        <Form.Item name="person_city">
                            <Input placeholder="miejscowość" />
                        </Form.Item>
                    </Space>
                </Space>
            </Form.Item>
        </FormSection>
    )
}
