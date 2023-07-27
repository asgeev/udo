import { FormSection } from '../FormSection/FormSection'
import { Space, Form, Input, DatePicker } from 'antd'
import { useTheme } from 'styled-components'

const rpwRegex = '^RPW/'
const isFieldValid = new RegExp(rpwRegex, 'i')

export const InflowFormSection = () => {
    const { colors } = useTheme()
    return (
        <FormSection
            backgroundColor={colors.color_card_5}
            sectionName="Dane wpływu"
            subTitle="Wprowadź dane dotyczące sprawy"
        >
            <Space>
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
                    <DatePicker placeholder="data wpływu" />
                </Form.Item>
            </Space>
        </FormSection>
    )
}
