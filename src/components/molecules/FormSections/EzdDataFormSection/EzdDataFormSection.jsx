import { useEffect } from 'react'
import { Form, Select, Input, Space } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import { useGetJRWAListQuery } from '@hooks/useGetJRWAListQuery'

export const EzdDataFormSection = ({ editMode = false, setError, form }) => {
    const personFirstName = Form.useWatch(['first_name'], form)
    const personLastName = Form.useWatch(['last_name'], form)
    const ezdNameValue = `UDO - ${personFirstName ? personFirstName : ''} ${
        personLastName ? personLastName : ''
    }`

    //Fetch data for jrwa select
    const { data, isError } = useGetJRWAListQuery()

    //If error set error state
    isError && setError(true)

    useEffect(() => {
        form?.setFieldValue('ezd_name', ezdNameValue)
    }, [ezdNameValue, form])

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
                        options={data}
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
                        placeholder="wprowadż nazwę koszulki"
                    ></Input>
                </Form.Item>
                <Form.Item name="nr_sprawy" label="Numer sprawy">
                    <Input disabled style={{ minWidth: 250 }} />
                </Form.Item>
                {editMode && (
                    <Form.Item name="koszulka_id" label="Id koszulki">
                        <Input disabled />
                    </Form.Item>
                )}
            </Space>
        </FormSection>
    )
}
