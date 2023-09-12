import { useEffect, useState, useContext } from 'react'
import {
    Space,
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Tooltip,
    Alert,
} from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import WP_Instance from '@services/WP_Instance'
import { FormSection } from '@molecules/FormSection/FormSection'
import { createInflowWayDataOptions } from '@helpers/createInflowWayDataOptions'
import { AddFormContext } from '@providers/AddFormProvider'

const rpwRegex = '^RPW/'
const isFieldValid = new RegExp(rpwRegex, 'i')

export const InflowFormSection = ({ editMode = false, setError }) => {
    const [inflowWayList, setInflowWayList] = useState([])
    const { getMetaDataFromEzd } = useContext(AddFormContext)

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getInflowWayList`)
            .then((response) => {
                setInflowWayList(response?.data)
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
                {!editMode && (
                    <Alert
                        message="Uwaga! W fazie testowej w pole Id koszulki wpływającej prosimy wpisywać podane nr koszulek: 3686, 3687, 3688"
                        type="warning"
                        showIcon
                        closable
                    />
                )}
                <Space wrap>
                    <Form.Item
                        name="inflow_koszulka_id"
                        label="Id koszulki wpływającej"
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
                        <Tooltip title="Wstaw dane z EZD">
                            <Button
                                type="primary"
                                icon={<SyncOutlined />}
                                onClick={getMetaDataFromEzd}
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
                <Space wrap>
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
                        name="requestor_act_date"
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            placeholder="data na piśmie"
                        />
                    </Form.Item>
                </Space>
            </Space>
        </FormSection>
    )
}
