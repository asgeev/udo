import { useState, useEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Space, Radio, DatePicker, Input } from 'antd'
import WP_Instance from '../../services/WP_Instance'
import { createJrwaDataOptions } from '../../helpers/createJrwaDataOptions'

const errorImportanceOptions = [{ id: '1', name: 'Standard' }]

export const AdditionalInfoFormSection = () => {
    const { TextArea } = Input
    const [importanceStatusList, setImportanceStatusList] = useState(null)

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getImportanceStatusList`)
            .then((response) => {
                setImportanceStatusList(response?.data)
            })
            .catch((error) => {
                console.error(error)
                setImportanceStatusList(errorImportanceOptions)
            })
    }, [])

    return (
        <FormSection sectionName="Dodatkowe informacje">
            <Space>
                <Form.Item
                    label="Priorytet sprawy"
                    name="importance_status_id"
                    initialValue="1"
                >
                    <Radio.Group
                        buttonStyle="outline"
                        optionType="button"
                        options={createJrwaDataOptions(importanceStatusList)}
                    ></Radio.Group>
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
