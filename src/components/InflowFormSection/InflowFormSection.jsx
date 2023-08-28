import { FormSection } from '../FormSection/FormSection'
import { Space, Form, Input, DatePicker, Select, Button, Tooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import locale from 'antd/es/date-picker/locale/pl_PL'

const rpwRegex = '^RPW/'
const isFieldValid = new RegExp(rpwRegex, 'i')

const inflowTypeOptions = [
    { value: 'epuap', label: 'epuap' },
    { value: 'poczta', lable: 'poczta' },
    { value: 'e-mail', label: 'e-mail' },
]

export const InflowFormSection = ({ editMode }) => {
    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane wpływu"
            subTitle="Wprowadź dane dotyczące sprawy"
        >
            <Space direction="vertical">
                <Space wrap>
                    <Form.Item
                        label="RPW"
                        name="rpw"
                        hasFeedback
                        validateTrigger={['onBlur', 'onChange']}
                        rules={[
                            {
                                required: true,
                                message: 'Podaj numer RPW',
                            },
                            () => ({
                                validator(_, rpw) {
                                    if (!rpw || isFieldValid.test(rpw)) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error('Błędny numer RPW')
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="numer RPW z EZD" />
                    </Form.Item>
                    <Form.Item
                        name="inflow_nr_koszulki"
                        label="Id koszulki"
                        rules={[
                            { required: true, message: 'Podaj numer koszulki' },
                        ]}
                    >
                        <Input placeholder="id koszulki" />
                    </Form.Item>
                    <Tooltip title="Synchronizuj z EZD">
                        <Button
                            disabled
                            type="primary"
                            icon={<SyncOutlined />}
                        />
                    </Tooltip>
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
                            format={'YYYY-MM-DD'}
                            placeholder="data wpływu"
                        />
                    </Form.Item>
                </Space>
                <Space>
                    <Form.Item name="inflow_type" label="Sposób dostarczenia">
                        <Select
                            placeholder="sposób dostarczenia"
                            options={inflowTypeOptions}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="requestor_act_signature"
                        label="Sygnatura akt"
                    >
                        <Input placeholder="sygnatura akt" />
                    </Form.Item>
                </Space>
            </Space>
        </FormSection>
    )
}
