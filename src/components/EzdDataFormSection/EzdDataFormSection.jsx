import { FormSection } from '../FormSection/FormSection'
import { Form, Select, Input } from 'antd'

export const EzdDataFormSection = () => {
    const { Option } = Select

    return (
        <FormSection sectionName="Dane sprawy w EZD">
            <Form.Item
                label="JRWA dla sprawy"
                tooltip="asfasff f faafsffafsasf asfaf af"
                name="jrwa_id"
                rules={[
                    {
                        type: 'number',
                        required: true,
                        message: 'Podaj jrwa',
                    },
                ]}
            >
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz jrwa"
                    allowClear
                >
                    <Option value={1}>6610</Option>
                    <Option value={2}>6611</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Nazwa koszulki w EZD"
                name="ezd_name"
                initialValue="UDO - "
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Podaj nazwę koszulki dla EZD',
                    },
                ]}
            >
                <Input placeholder="wprowadż nazwę koszulki"></Input>
            </Form.Item>
        </FormSection>
    )
}
