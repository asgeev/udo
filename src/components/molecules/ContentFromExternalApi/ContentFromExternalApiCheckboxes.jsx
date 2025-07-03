import { Form, Checkbox, Input, DatePicker, List, Flex } from 'antd'

const ContentFromExternalApiCheckboxes = ({ data }) => {
    const externalSystems = Form.useWatch('external_systems_checkbox')

    return (
        <>
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
                                <List.Item key={index} style={{ margin: 0 }}>
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
                                                                'Data od jest wymagana',
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
                                                                'Data do jest wymagana',
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
        </>
    )
}

export default ContentFromExternalApiCheckboxes
