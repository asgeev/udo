import { FormSection } from '../FormSection/FormSection'
import { Form, Space, Radio, DatePicker, Input } from 'antd'
export const AdditionalInfoFormSection = () => {
    const { TextArea } = Input

    return (
        <FormSection sectionName="Dodatkowe informacje">
            <Space>
                <Form.Item
                    label="Priorytet sprawy"
                    name="importance_status_id"
                    initialValue={1}
                >
                    <Radio.Group>
                        <Radio.Button value={1}>Normalny</Radio.Button>
                        <Radio.Button value={2}>Wysoki</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Czas odpowiedzi" name="max_finish_date">
                    <DatePicker />
                </Form.Item>
            </Space>

            <Form.Item name="comment" label="Dodatkowy opis">
                <TextArea></TextArea>
            </Form.Item>
        </FormSection>
    )
}
