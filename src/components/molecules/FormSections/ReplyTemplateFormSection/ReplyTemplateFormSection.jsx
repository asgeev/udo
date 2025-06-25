import {
    Alert,
    Space,
    Form,
    Checkbox,
    Input,
    DatePicker,
    List,
    Flex,
} from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'

//Import fetching external systems structure
import { useExternalSystems } from '@hooks/useExternalSystems'

export const ReplyTemplateFormSection = ({ editMode = false }) => {
    const { data } = useExternalSystems()

    const externalSystems = Form.useWatch('external_systems_checkbox')

    console.log(externalSystems)

    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Space direction="vertical" size={20}>
                <Alert
                    showIcon
                    message="Dane z wybranego poniżej systemu będziesz mógł/mogła wykorzystać przy tworzeniu odpowiedzi."
                    type="info"
                    closeIcon
                />
                {data?.map((item) => {
                    return (
                        <List
                            size="small"
                            key={item.id}
                            header={<strong>{item.system_long_name}</strong>}
                            bordered
                        >
                            {item?.checkbox?.map((checkbox, index) => {
                                return (
                                    <List.Item
                                        key={index}
                                        style={{ margin: 0 }}
                                    >
                                        <Form.Item
                                            name={[
                                                'external_systems_checkbox',
                                                index,
                                                'checked',
                                            ]}
                                            style={{ margin: 0 }}
                                            valuePropName="checked"
                                            initialValue={false}
                                        >
                                            <Checkbox>{checkbox.name}</Checkbox>
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'external_systems_checkbox',
                                                index,
                                                'id',
                                            ]}
                                            style={{ margin: 0 }}
                                            hidden
                                            initialValue={checkbox.id}
                                        >
                                            <Input hidden />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'external_systems_checkbox',
                                                index,
                                                'positive_template',
                                            ]}
                                            style={{ margin: 0 }}
                                            hidden
                                            initialValue={
                                                checkbox.positive_template
                                            }
                                        >
                                            <Input hidden />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'external_systems_checkbox',
                                                index,
                                                'negative_template',
                                            ]}
                                            style={{ margin: 0 }}
                                            hidden
                                            initialValue={
                                                checkbox.negative_template
                                            }
                                        >
                                            <Input hidden />
                                        </Form.Item>
                                        {checkbox?.dates === 1 &&
                                            externalSystems &&
                                            externalSystems[index]?.checked && (
                                                <Flex gap="small">
                                                    <Form.Item
                                                        key={`date_from_${item.id}_${index}`}
                                                        name={[
                                                            'external_systems_checkbox',
                                                            index,
                                                            'date_from',
                                                        ]}
                                                        style={{ margin: 0 }}
                                                        rules={[
                                                            {
                                                                required:
                                                                    externalSystems &&
                                                                    externalSystems[
                                                                        index
                                                                    ]?.checked,
                                                                message:
                                                                    'Data początkowa jest wymagana',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker placeholder="Data od" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        key={`date_to_${item.id}_${index}`}
                                                        style={{ margin: 0 }}
                                                        name={[
                                                            'external_systems_checkbox',
                                                            index,
                                                            'date_to',
                                                        ]}
                                                        rules={[
                                                            {
                                                                required:
                                                                    externalSystems &&
                                                                    externalSystems[
                                                                        index
                                                                    ]?.checked,
                                                                message:
                                                                    'Data początkowa jest wymagana',
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker placeholder="Data do" />
                                                    </Form.Item>
                                                </Flex>
                                            )}
                                    </List.Item>
                                )
                            })}
                        </List>
                    )
                })}
            </Space>
        </FormSection>
    )
}
