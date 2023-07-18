import { useState, useEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, Select, Input } from 'antd'
import WP_Instance from '../../services/WP_Instance'
import { createJrwaDataOptions } from '../../helpers/createJrwaDataOptions'

export const EzdDataFormSection = ({ setError }) => {
    const [jrwaData, setJrwaData] = useState([])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getJRWAList`)
            .then((response) => {
                setJrwaData(response?.data)
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
    }, [])

    return (
        <FormSection sectionName="Dane sprawy w EZD">
            <Form.Item
                label="JRWA dla sprawy"
                tooltip="asfasff f faafsffafsasf asfaf af"
                name="jrwa_id"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Podaj jrwa',
                    },
                ]}
            >
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz jrwa"
                    allowClear
                    options={createJrwaDataOptions(jrwaData)}
                ></Select>
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
