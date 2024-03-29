import { useContext } from 'react'
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
import { FormSection } from '@molecules/FormSection/FormSection'
import { AddFormContext } from '@providers/AddFormProvider'
import { useGetInflowWayListQuery } from '@hooks/useGetInflowWayListQuery'

export const InflowFormSection = ({ editMode = false, setError }) => {
    const { getMetaDataFromEzd } = useContext(AddFormContext)

    //Fetch inflow way list
    const { data, isError } = useGetInflowWayListQuery()

    //Set global error state
    isError && setError(true)

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
                <Space id="formItemInfowKoszulkaId" wrap>
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
                            id="inputInflowKoszulkaId"
                            disabled={editMode}
                            placeholder="id koszulki wpływającej"
                        />
                    </Form.Item>
                    {!editMode && (
                        <Tooltip title="Wstaw dane z EZD">
                            <Button
                                id="getMetaDataFromEzdButton"
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
                            options={data}
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
