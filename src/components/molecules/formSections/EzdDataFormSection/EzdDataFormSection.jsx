import { useState, useEffect, useContext } from 'react'
import { Form, Select, Input, Space } from 'antd'
import WP_Instance from '@services/WP_Instance'
import { FormSection } from '@molecules/FormSection/FormSection'
import { createJrwaDataOptions } from '@helpers/createJrwaDataOptions'
import { EditFormContext } from '@providers/EditFormProvider'

export const EzdDataFormSection = () => {
    const [jrwaData, setJrwaData] = useState([])
    const { editMode, setError } = useContext(EditFormContext)

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
        <FormSection
            editMode={editMode}
            sectionName="Dane sprawy w EZD"
            subTitle="Dodaj dane dotyczące nazwy koszulki oraz JRWA pod którym będzie zarejestrowana sprawa"
        >
            <Space wrap style={{ width: '100%' }}>
                <Form.Item
                    label="JRWA dla sprawy"
                    tooltip=""
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
                        disabled={editMode}
                        style={{ maxWidth: 200 }}
                        placeholder="wybierz jrwa"
                        allowClear
                        options={createJrwaDataOptions(jrwaData)}
                    ></Select>
                </Form.Item>

                <Form.Item
                    label="Nazwa koszulki w EZD"
                    name="ezd_name"
                    rules={[
                        {
                            type: 'string',
                            required: true,
                            message: 'Podaj nazwę koszulki dla EZD',
                        },
                    ]}
                >
                    <Input
                        style={{ minWidth: 300 }}
                        disabled={editMode}
                        placeholder="wprowadż nazwę koszulki"
                    ></Input>
                </Form.Item>
                {editMode && (
                    <Form.Item name="koszulka_id" label="Id koszulki">
                        <Input
                            disabled={editMode}
                            placeholder="id koszulki utworzonej"
                        />
                    </Form.Item>
                )}
            </Space>
        </FormSection>
    )
}
