import { FormSection } from '../FormSection/FormSection'
import { Space, Form, Input, DatePicker } from 'antd'

export const InflowFormSection = () => {
    return (
        <FormSection sectionName="Dane wpływu">
            <Space>
                <Form.Item
                    label="RPW"
                    name="rpw"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: 'Podaj numer RPW',
                        },
                    ]}
                >
                    <Input placeholder="numer RPW z EZD" />
                </Form.Item>
                <Form.Item
                    label="Data wpływu"
                    name="inflow_date"
                    rules={[
                        {
                            type: 'date',
                            required: true,
                            message: 'Podaj datę wpływu',
                        },
                    ]}
                >
                    <DatePicker placeholder="data wpływu" />
                </Form.Item>
            </Space>
        </FormSection>
    )
}
