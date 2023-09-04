import { useContext, useEffect, useState } from 'react'
import { Space, Form, Input, DatePicker, Select, Button, Tooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import WP_Instance from '@services/WP_Instance'
import { FormSection } from '@molecules/FormSection/FormSection'
import { EditFormContext } from '@providers/EditFormProvider'
import { createInflowWayDataOptions } from '@helpers/createInflowWayDataOptions'

const rpwRegex = '^RPW/'
const isFieldValid = new RegExp(rpwRegex, 'i')

export const InflowFormSection = () => {
    const { editMode, setError } = useContext(EditFormContext)
    const [inflowWayList, setInflowaWayList] = useState([])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getInflowWayList`)
            .then((response) => {
                setInflowaWayList(response?.data)
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
    }, [])

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane wpływu"
            subTitle="Wprowadź dane dotyczące sprawy"
        >
            <Space direction="vertical">
                <Space wrap>
                    <Form.Item
                        name="inflow_nr_koszulki"
                        label="Id koszulki"
                        rules={[
                            {
                                required: true,
                                message: 'Podaj numer koszulki wpływającej',
                            },
                        ]}
                    >
                        <Input
                            disabled={editMode}
                            placeholder="id koszulki wpływającej"
                        />
                    </Form.Item>
                    {!editMode && (
                        <Tooltip title="Synchronizuj z EZD">
                            <Button
                                disabled
                                type="primary"
                                icon={<SyncOutlined />}
                            />
                        </Tooltip>
                    )}
                </Space>
                <Space>
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
                        <DatePicker
                            disabled={editMode}
                            format={'YYYY-MM-DD'}
                            placeholder="data wpływu"
                        />
                    </Form.Item>
                    <Form.Item label="RPW" name="rpw">
                        <Input placeholder="numer RPW z EZD" />
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item name="inflow_way_id" label="Sposób dostarczenia">
                        <Select
                            placeholder="sposób dostarczenia"
                            options={createInflowWayDataOptions(inflowWayList)}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="requestor_act_signature"
                        label="Sygnatura akt"
                    >
                        <Input placeholder="sygnatura akt" />
                    </Form.Item>
                    <Form.Item
                        label="Data na piśmie wpływającym"
                        name="inflow_date"
                        rules={[
                            {
                                type: 'date',
                                required: true,
                                message: 'Podaj datę wpływu',
                            },
                        ]}
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            placeholder="data wpływu"
                        />
                    </Form.Item>
                </Space>
            </Space>
        </FormSection>
    )
}
