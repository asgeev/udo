import {
    Form,
    Checkbox,
    Input,
    DatePicker,
    List,
    Flex,
    Typography,
    Select,
} from 'antd'

const ContentFromExternalApiCheckboxes = ({ data, inputName }) => {
    const externalSystems = Form.useWatch(inputName)

    const { Text } = Typography
    return (
        <List
            dataSource={data}
            renderItem={({ id, name, columns, dates }, index) => {
                //Convert columns to valid select options
                const columnsOptions = columns?.map((item) => ({
                    value: item?.id,
                    label: item?.name,
                }))

                return (
                    <>
                        <Form.Item
                            name={[inputName, index, 'checked']}
                            style={{ margin: 0 }}
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Checkbox>
                                <Text style={{ fontSize: 12 }}>{name}</Text>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item
                            name={[inputName, index, 'id']}
                            style={{ margin: 0 }}
                            hidden
                            initialValue={id}
                        >
                            <Input hidden />
                        </Form.Item>
                        {externalSystems && externalSystems[index]?.checked && (
                            <Flex gap={8} vertical>
                                {dates === 1 && (
                                    <Flex gap="small">
                                        <Form.Item
                                            key={`date_from_${id}_${index}`}
                                            name={[
                                                inputName,
                                                index,
                                                'date_from',
                                            ]}
                                            style={{ margin: 0 }}
                                            rules={[
                                                {
                                                    required:
                                                        externalSystems &&
                                                        externalSystems[index]
                                                            ?.checked,
                                                    message:
                                                        'Data od jest wymagana',
                                                },
                                            ]}
                                        >
                                            <DatePicker placeholder="Data od" />
                                        </Form.Item>
                                        <Form.Item
                                            key={`date_to_${id}_${index}`}
                                            style={{ margin: 0 }}
                                            name={[inputName, index, 'date_to']}
                                            rules={[
                                                {
                                                    required:
                                                        externalSystems &&
                                                        externalSystems[index]
                                                            ?.checked,
                                                    message:
                                                        'Data do jest wymagana',
                                                },
                                            ]}
                                        >
                                            <DatePicker placeholder="Data do" />
                                        </Form.Item>
                                    </Flex>
                                )}
                                {columns && (
                                    <Form.Item
                                        name={[inputName, index, 'columns']}
                                        style={{ margin: 0 }}
                                    >
                                        <Select
                                            mode="multiple"
                                            options={columnsOptions}
                                            placeholder="Wybierz kolumny"
                                        />
                                    </Form.Item>
                                )}
                            </Flex>
                        )}
                    </>
                )
            }}
        />
    )
}

export default ContentFromExternalApiCheckboxes
