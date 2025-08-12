import {
    Form,
    DatePicker,
    Flex,
    Typography,
    Select,
    Tag,
    Button,
    Row,
    Col,
    List,
    Empty,
} from 'antd'
import { useState } from 'react'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'

const ContentFromExternalApiCheckboxes = ({ data, inputName, form }) => {
    const [selected, setSelected] = useState(null)
    if (!inputName) return

    const selectHeight = 240

    const map = (arr) => {
        return arr?.map((item) => ({
            value: item?.id,
            label: item?.name,
        }))
    }
    const mapZakres = (arr) => {
        return arr?.map((item) => ({
            value: item?.id,
            label: `${item.kod} ${item?.name}`,
        }))
    }
    const mapRodzaj = (arr) => {
        return arr?.map((item) => ({
            value: item?.id,
            label: `${item.name} - ${item?.description}`,
        }))
    }

    const selectData = map(data)

    return (
        <Form.List name={inputName}>
            {(fields, { add, remove }) => {
                const isListEmpty = fields?.length <= 0

                return (
                    <Flex vertical gap={8}>
                        <Flex vertical>
                            <Typography.Text>
                                Wybierz zadanie dla robota
                            </Typography.Text>

                            <Row gutter={8} wrap={false}>
                                <Col flex="auto">
                                    <Select
                                        options={selectData}
                                        onChange={(val) => setSelected(val)}
                                        style={{ width: '100%' }}
                                        placeholder="Wybierz z listy"
                                        defaultValue={selected}
                                        listHeight={selectHeight}
                                    />
                                </Col>
                                <Col flex="none">
                                    <Button
                                        type="primary"
                                        icon={<PlusCircleOutlined />}
                                        disabled={!selected}
                                        onClick={() => {
                                            add({ id: selected })
                                        }}
                                    >
                                        Dodaj zadanie
                                    </Button>
                                </Col>
                            </Row>
                        </Flex>

                        <List bordered itemLayout="vertical">
                            {isListEmpty ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <>
                                    {fields?.map(
                                        ({ key, name, ...restField }) => {
                                            const fieldId = form.getFieldValue([
                                                inputName,
                                                name,
                                                'id',
                                            ])
                                            const element = data?.find(
                                                (el) => el?.id === fieldId
                                            )

                                            const {
                                                dates,
                                                options,
                                                columns,
                                                rodzaj_swiadczen,
                                                zakres_swiadczen,
                                                name: jobName,
                                                system_name,
                                            } = element || {}

                                            const hasDates = dates === 1

                                            //Map to select options
                                            const selectColumns =
                                                columns && map(columns)
                                            const selectOptions =
                                                options && map(options)
                                            const selectRodzaje =
                                                rodzaj_swiadczen &&
                                                mapRodzaj(rodzaj_swiadczen)
                                            const selectZakres =
                                                zakres_swiadczen &&
                                                mapZakres(zakres_swiadczen)

                                            // const arr =

                                            return (
                                                <List.Item
                                                    key={key}
                                                    extra={[
                                                        <Button
                                                            key={'delete'}
                                                            type="text"
                                                            title="Usuń zadanie"
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            onClick={() => {
                                                                remove(name)
                                                            }}
                                                            danger
                                                        />,
                                                    ]}
                                                >
                                                    <List.Item.Meta
                                                        title={
                                                            <Typography.Text
                                                                title={jobName}
                                                                ellipsis
                                                            >
                                                                {jobName}
                                                            </Typography.Text>
                                                        }
                                                        avatar={
                                                            <Tag>
                                                                {system_name}
                                                            </Tag>
                                                        }
                                                    />
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'id']}
                                                        hidden
                                                    />

                                                    <div
                                                        style={{
                                                            marginLeft: 48,
                                                        }}
                                                    >
                                                        <Row gutter={8}>
                                                            {hasDates && (
                                                                <>
                                                                    <Col
                                                                        span={4}
                                                                    >
                                                                        <Typography.Text type="secondary">
                                                                            Czasookres*
                                                                        </Typography.Text>
                                                                    </Col>
                                                                    <Col
                                                                        span={
                                                                            20
                                                                        }
                                                                    >
                                                                        <Flex
                                                                            gap={
                                                                                8
                                                                            }
                                                                        >
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[
                                                                                    name,
                                                                                    'date_from',
                                                                                ]}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message:
                                                                                            'Data od jest wymagana',
                                                                                    },
                                                                                ]}
                                                                            >
                                                                                <DatePicker
                                                                                    placeholder="Data od"
                                                                                    type="button"
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[
                                                                                    name,
                                                                                    'date_to',
                                                                                ]}
                                                                                dependencies={[
                                                                                    inputName,
                                                                                    name,
                                                                                    'date_from',
                                                                                ]}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                        message:
                                                                                            'Data do jest wymagana',
                                                                                    },
                                                                                    ({
                                                                                        getFieldValue,
                                                                                    }) => ({
                                                                                        validator(
                                                                                            _,
                                                                                            value
                                                                                        ) {
                                                                                            if (
                                                                                                !value ||
                                                                                                getFieldValue(
                                                                                                    [
                                                                                                        inputName,
                                                                                                        name,
                                                                                                        'date_from',
                                                                                                    ]
                                                                                                ) <
                                                                                                    value
                                                                                            ) {
                                                                                                return Promise.resolve()
                                                                                            }

                                                                                            return Promise.reject(
                                                                                                new Error(
                                                                                                    'Data jest wcześniejsza niż data od'
                                                                                                )
                                                                                            )
                                                                                        },
                                                                                    }),
                                                                                ]}
                                                                            >
                                                                                <DatePicker placeholder="Data do" />
                                                                            </Form.Item>
                                                                        </Flex>
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </Row>
                                                        <Row gutter={8}>
                                                            {columns && (
                                                                <>
                                                                    <Col
                                                                        span={4}
                                                                    >
                                                                        <Typography.Text type="secondary">
                                                                            Kolumny*
                                                                        </Typography.Text>
                                                                    </Col>
                                                                    <Col
                                                                        span={
                                                                            20
                                                                        }
                                                                    >
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[
                                                                                name,
                                                                                'columns',
                                                                            ]}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Wybierz co najmniej jedną kolumnę',
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Select
                                                                                optionFilterProp="label"
                                                                                listHeight={
                                                                                    selectHeight
                                                                                }
                                                                                maxTagCount={
                                                                                    2
                                                                                }
                                                                                maxTagTextLength={
                                                                                    20
                                                                                }
                                                                                mode="multiple"
                                                                                options={
                                                                                    selectColumns
                                                                                }
                                                                                placeholder="Wybierz kolumny załącznika"
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </Row>
                                                        <Row gutter={8}>
                                                            {selectRodzaje && (
                                                                <>
                                                                    <Col
                                                                        span={4}
                                                                    >
                                                                        <Typography.Text type="secondary">
                                                                            Rodzaje
                                                                        </Typography.Text>
                                                                    </Col>
                                                                    <Col
                                                                        span={
                                                                            20
                                                                        }
                                                                    >
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[
                                                                                name,
                                                                                'rodzaj_swiadczen',
                                                                            ]}
                                                                        >
                                                                            <Select
                                                                                mode="multiple"
                                                                                listHeight={
                                                                                    selectHeight
                                                                                }
                                                                                maxTagCount={
                                                                                    6
                                                                                }
                                                                                options={
                                                                                    selectRodzaje
                                                                                }
                                                                                maxTagTextLength={
                                                                                    3
                                                                                }
                                                                                optionFilterProp="label"
                                                                                placeholder="Wybierz rodzaje świadczeń"
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </Row>
                                                        <Row gutter={8}>
                                                            {rodzaj_swiadczen && (
                                                                <>
                                                                    <Col
                                                                        span={4}
                                                                    >
                                                                        <Typography.Text type="secondary">
                                                                            Zakresy
                                                                        </Typography.Text>
                                                                    </Col>
                                                                    <Col
                                                                        span={
                                                                            20
                                                                        }
                                                                    >
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[
                                                                                name,
                                                                                'zakres_swiadczen',
                                                                            ]}
                                                                        >
                                                                            <Select
                                                                                mode="multiple"
                                                                                listHeight={
                                                                                    selectHeight
                                                                                }
                                                                                options={
                                                                                    selectZakres
                                                                                }
                                                                                maxTagTextLength={
                                                                                    60
                                                                                }
                                                                                placeholder="Wybierz zakresy świadczeń"
                                                                                optionFilterProp="label"
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </Row>
                                                        <Row gutter={8}>
                                                            {options && (
                                                                <>
                                                                    <Col
                                                                        span={4}
                                                                    >
                                                                        <Typography.Text type="secondary">
                                                                            Opcje
                                                                        </Typography.Text>
                                                                    </Col>
                                                                    <Col
                                                                        span={
                                                                            20
                                                                        }
                                                                    >
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[
                                                                                name,
                                                                                'options',
                                                                            ]}
                                                                        >
                                                                            <Select
                                                                                optionFilterProp="label"
                                                                                mode="multiple"
                                                                                listHeight={
                                                                                    selectHeight
                                                                                }
                                                                                options={
                                                                                    selectOptions
                                                                                }
                                                                                placeholder="Wybierz dodatkowe opcje"
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </>
                                                            )}
                                                        </Row>
                                                    </div>
                                                </List.Item>
                                            )
                                        }
                                    )}
                                </>
                            )}
                        </List>
                    </Flex>
                )
            }}
        </Form.List>
    )
}

export default ContentFromExternalApiCheckboxes
