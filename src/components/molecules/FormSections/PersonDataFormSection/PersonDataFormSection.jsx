import { Form, Input, Row, Col, Space, DatePicker, Alert } from 'antd'
import { useTheme } from 'styled-components'
import { FormSection } from '@molecules/FormSection/FormSection'

export const PersonDataFormSection = ({ editMode = false, setError }) => {
    const { colors } = useTheme()
    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane osoby"
            backgroundColor={colors.color_card_4}
            subTitle="Wprowadź dane dotyczące osoby której dotyczy zapytanie"
        >
            <Alert
                message="Jeżeli podano błędny pesel to pole będzie wyświetlało się na czerwono ale zgłoszenie uda się zapisać"
                type="info"
                showIcon
                closable
                style={{ marginBottom: 10 }}
            />
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
                        <DatePicker format={'YYYY-MM-DD'} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Adres">
                <Space direction="vertical" style={{ rowGap: 0 }}>
                    <Space direction="horizontal" wrap>
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
                        <Form.Item name="person_postcode">
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
