import {
    Form,
    Input,
    Typography,
    Space,
    Button,
    DatePicker,
    AutoComplete,
    Select,
    Divider,
    Radio,
    Col,
    Row,
} from 'antd'
import styled from 'styled-components'

export const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

const onSubmit = (values) => {
    const valuesa = {
        ...values,
        date: values['date'].format('YYYY-MM-DD'),
    }

    console.log('Success:', valuesa)
}
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Podaj datę wpływu',
        },
    ],
}

const onSelect = (data) => {
    console.log('onSelect', data)
}

const company = [
    { value: 'podmiot1' },
    { value: 'podmiot2' },
    { value: 'podmiot3' },
    { value: 'podmiot4' },
    { value: 'podmiot5' },
    { value: 'podmiot6' },
    { value: 'podmiot7' },
    { value: 'podmiot8' },
    { value: 'podmiot9' },
    { value: 'podmiot10' },
    { value: 'podmiot11' },
    { value: 'podmiot12' },
]

export const MainAdd = () => {
    const { Title } = Typography
    const { TextArea } = Input

    return (
        <FormWrapper>
            <Form
                // {...mainAddformItemLayout}
                name="mainAddForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError
                layout="vertical"
                style={{ minWidth: 400, maxWidth: 800, width: '100%' }}
            >
                <Title style={{ marginBottom: 60, marginTop: 30 }} level={2}>
                    Zarejestruj zapytanie
                </Title>
                <Row>
                    <Col span={4}>
                        <Title level={4}>Dane wpływu</Title>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={19}>
                        <Space>
                            <Form.Item
                                label="RPW"
                                name="rpw"
                                rules={[
                                    {
                                        type: 'string',
                                        required: true,
                                        message: 'Podaj numer RPW',
                                    },
                                ]}
                            >
                                <Input placeholder="numer RPW z EZD" />
                            </Form.Item>
                            <Form.Item
                                label="Data wpływu"
                                name="date"
                                {...config}
                            >
                                <DatePicker placeholder="data wpływu" />
                            </Form.Item>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50 }}>
                    <Col span={4}>
                        <Title level={4}>Dane osoby</Title>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={19}>
                        <Form.Item label="Pesel" name="pesel">
                            <Input
                                placeholder="Pesel"
                                style={{ maxWidth: 200 }}
                            />
                        </Form.Item>
                        <Form.Item label="Imię" name="imie">
                            <Input placeholder="Imię" />
                        </Form.Item>
                        <Form.Item label="Nazwisko" name="nazwisko">
                            <Input placeholder="Nazwisko" />
                        </Form.Item>
                        <Form.Item label="Data urodzenia" name="data_urodzenia">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="Adres">
                            <Space direction="vertical" style={{ rowGap: 0 }}>
                                <Space.Compact direction="horizontal" block>
                                    <Form.Item name="ulica">
                                        <Input
                                            placeholder="ulica"
                                            style={{ width: 250 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="nr_domu">
                                        <Input
                                            placeholder="nr domu"
                                            style={{ width: 120 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="nr_mieszkania">
                                        <Input
                                            placeholder="nr mieszkania"
                                            style={{ maxWidth: 120 }}
                                        />
                                    </Form.Item>
                                </Space.Compact>
                                <Space.Compact direction="horizontal" block>
                                    <Form.Item name="kod_pocztowy">
                                        <Input placeholder="kod pocztowy" />
                                    </Form.Item>
                                    <Form.Item name="miejscowość">
                                        <Input placeholder="miejscowość" />
                                    </Form.Item>
                                </Space.Compact>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50 }}>
                    <Col span={4}>
                        <Title level={4}>Dane wnioskodawcy</Title>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={19}>
                        <Form.Item label="Nazwa podmiotu" name="nazwa_podmiotu">
                            <AutoComplete
                                options={company}
                                onSearch={(text) => {
                                    console.log(text)
                                }}
                                onSelect={onSelect}
                                placeholder="input here"
                            />
                        </Form.Item>
                        <Form.Item label="Adres wnioskodawcy">
                            <Space direction="vertical" style={{ rowGap: 0 }}>
                                <Space.Compact direction="horizontal" block>
                                    <Form.Item name="company_ulica">
                                        <Input
                                            placeholder="ulica"
                                            style={{ width: 250 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="company_nr_domu">
                                        <Input
                                            placeholder="nr domu"
                                            style={{ width: 120 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="company_nr_mieszkania">
                                        <Input
                                            placeholder="nr mieszkania"
                                            style={{ maxWidth: 120 }}
                                        />
                                    </Form.Item>
                                </Space.Compact>
                                <Space.Compact>
                                    <Form.Item name="company_kod_pocztowy">
                                        <Input placeholder="kod pocztowy" />
                                    </Form.Item>
                                    <Form.Item name="company_miejscowość">
                                        <Input placeholder="miejscowość" />
                                    </Form.Item>
                                </Space.Compact>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50 }}>
                    <Col span={4}>
                        <Title level={4}>Dane szablonu odpowiedzi</Title>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={19}>
                        <Form.Item
                            name="podstawa_prawna_dla"
                            label="Podstawa prawna dla"
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'tom',
                                        label: 'Tom',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="text_area" label="Odpowiedź">
                            <TextArea></TextArea>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50 }}>
                    <Col span={4}>
                        <Title level={4}>Dodatkowe informacje</Title>
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    <Col span={19}>
                        {' '}
                        <Form.Item
                            label="Priorytet sprawy"
                            name="priority"
                            initialValue="default"
                        >
                            <Radio.Group>
                                <Radio.Button value="default">
                                    Normalny
                                </Radio.Button>
                                <Radio.Button value="high">Wysoki</Radio.Button>
                                <Radio.Button value={1}>
                                    Bardzo wysoki
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="text_area_add" label="Dodatkowy opis">
                            <TextArea></TextArea>
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginTop: 50 }} justify="end">
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Zapisz
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </FormWrapper>
    )
}
