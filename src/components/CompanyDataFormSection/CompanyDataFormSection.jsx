import { FormSection } from '../FormSection/FormSection'
import { Form, AutoComplete, Space, Input } from 'antd'

const company = [
    { value: 'dsasasasd', label: 'podmiot1', id: '1' },
    { value: 'podmiot2' },
    { value: 'podmiot3' },
    { value: 'podmiot4' },
    { value: 'podmiot5' },
    { value: 'podmiot6' },
    { value: 'podmiot7' },
    { value: 'podmiot8' },
    { value: 'podmiot9' },
    { value: 'podmiot10' },
    { value: 'podmiot11' },
    { value: 'podmiot12' },
]

export const CompanyDataFormSection = ({ onSelect }) => {
    return (
        <FormSection sectionName="Dane wnioskodawcy">
            <Form.Item hidden={true} name="company_id">
                <Input />
            </Form.Item>
            <Form.Item
                label="Nazwa podmiotu"
                name="company_name"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Prosze podać nazwę podmiotu',
                    },
                ]}
            >
                <AutoComplete
                    options={company}
                    // onSearch={(text) => {
                    //     console.log(text)
                    // }}
                    onSelect={onSelect}
                    // onChange={(text) => {
                    //     console.log(text)
                    // }}

                    placeholder="wyszukaj lub wprowadź nazwę podmiotu"
                />
            </Form.Item>
            <Form.Item label="Adres wnioskodawcy" required>
                <Space direction="vertical" style={{ rowGap: 0 }}>
                    <Space direction="horizontal">
                        <Form.Item
                            name="company_street"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj ulicę',
                                },
                            ]}
                        >
                            <Input placeholder="ulica" style={{ width: 250 }} />
                        </Form.Item>
                        <Form.Item
                            name="company_house"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj nr domu',
                                },
                            ]}
                        >
                            <Input
                                placeholder="nr domu"
                                style={{ width: 120 }}
                            />
                        </Form.Item>
                        <Form.Item name="company_apartment">
                            <Input
                                placeholder="nr mieszkania"
                                style={{ maxWidth: 120 }}
                            />
                        </Form.Item>
                    </Space>
                    <Space>
                        <Form.Item
                            name="company_postcode"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj kod pocztowy',
                                },
                            ]}
                        >
                            <Input placeholder="kod pocztowy" />
                        </Form.Item>
                        <Form.Item
                            name="company_city"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj miasto',
                                },
                            ]}
                        >
                            <Input placeholder="miejscowość" />
                        </Form.Item>
                    </Space>
                </Space>
            </Form.Item>
        </FormSection>
    )
}
