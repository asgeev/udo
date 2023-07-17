import { useState, useEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Row, Col, Select, Input } from 'antd'
import WP_Instance from '../../services/WP_Instance'

export const ReplyTemplateFormSection = () => {
    const { TextArea } = Input
    const [companyTypesItems, setCompanyTypesItems] = useState([])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getCompanyTypesList`)
            .then((response) => {
                setCompanyTypesItems(response?.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <FormSection sectionName="Dane szablonu odpowiedzi">
            <Row gutter={[8, 0]}>
                <Col span={12}>
                    <Form.Item
                        name="company_type_id"
                        label="Podstawa prawna dla"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                                message: 'Wybierz podstawę prawną odpowiedzi',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            showArrow
                            placeholder="podstawa prawna dla"
                            optionLabelProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            onSelect={(value) => console.log(value)}
                            options={companyTypesItems}
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
                        type: 'number',
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
