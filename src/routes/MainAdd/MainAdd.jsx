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
    message,
} from 'antd'
import { useState } from 'react'
import WP_Instance from '../../services/WP_Instance'
import styled from 'styled-components'
import { FormSection } from '../../components/FormSection/FormSection'

export const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const onSelect = (data) => {
    console.log('onSelect', data)
}

const company = [
    { value: 'dsasasasd', label: 'podmiot1', id: '1' },
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
    const { Option } = Select
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)

    //From failed
    const onFinishFailed = (values) => {
        messageApi.error('Wypełnij wszystkie wymagane pola')
        console.log('Failed:', values)
    }

    //On submit form
    const onSubmit = (values) => {
        const newValues = {
            ...values,
            inflow_date: values['inflow_date']?.format('YYYY-MM-DD'),
            birth_date: values['birth_date']?.format('YYYY-MM-DD'),
            max_finish_date: values['max_finish_date']?.format('YYYY-MM-DD'),
        }
        setLoading(true)

        console.log('Success:', newValues)

        WP_Instance.post('/udo/v1/addDataRequest', newValues)
            .then((res) => {
                console.log(res)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                messageApi.error(err.message)
                console.log(err)
            })
    }

    return (
        <>
            {contextHolder}

            <FormWrapper>
                <Form
                    name="mainAddForm"
                    initialValues={{}}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                    onValuesChange={(changedValues) => {
                        console.log(changedValues)
                    }}
                    layout="vertical"
                    style={{ minWidth: 400, maxWidth: 800, width: '100%' }}
                >
                    <Title
                        style={{ marginBottom: 60, marginTop: 30 }}
                        level={2}
                    >
                        Zarejestruj zapytanie
                    </Title>
                    <FormSection sectionName="Dane wpływu">
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
                    <FormSection sectionName="Dane osoby">
                        <Form.Item label="Pesel" name="pesel">
                            <Input
                                placeholder="pesel"
                                style={{ maxWidth: 200 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Inne dane identyfikacyjne"
                            name="other_identification_data"
                        >
                            <Input placeholder="inne dane identyfikacyjne" />
                        </Form.Item>
                        <Row gutter={[8, 0]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Imię"
                                    name="first_name"
                                    rules={[
                                        {
                                            type: 'string',
                                            required: true,
                                            message: 'Podaj imię osoby',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Imię" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Drugie imię"
                                    name="second_name"
                                >
                                    <Input placeholder="drugie imie" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[8, 0]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Nazwisko"
                                    name="last_name"
                                    rules={[
                                        {
                                            type: 'string',
                                            required: true,
                                            message: 'Podaj nazwisko osoby',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nazwisko" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label="Data urodzenia"
                                    name="birth_date"
                                >
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Adres">
                            <Space direction="vertical" style={{ rowGap: 0 }}>
                                <Space direction="horizontal">
                                    <Form.Item name="person_street">
                                        <Input
                                            placeholder="ulica"
                                            style={{ width: 250 }}
                                        />
                                    </Form.Item>

                                    <Form.Item name="person_house">
                                        <Input
                                            placeholder="nr domu"
                                            style={{ width: 120 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="person_apartment">
                                        <Input
                                            placeholder="nr mieszkania"
                                            style={{ maxWidth: 120 }}
                                        />
                                    </Form.Item>
                                </Space>
                                <Space direction="horizontal">
                                    <Form.Item name="preson_postcode">
                                        <Input placeholder="kod pocztowy" />
                                    </Form.Item>
                                    <Form.Item name="person_city">
                                        <Input placeholder="miejscowość" />
                                    </Form.Item>
                                </Space>
                            </Space>
                        </Form.Item>
                    </FormSection>

                    <FormSection sectionName="Dane wnioskodawcy">
                        <Form.Item hidden={true} name="company_id">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Nazwa podmiotu"
                            name="company_name"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Prosze podać nazwę podmiotu',
                                },
                            ]}
                        >
                            <AutoComplete
                                options={company}
                                // onSearch={(text) => {
                                //     console.log(text)
                                // }}
                                onSelect={onSelect}
                                // onChange={(text) => {
                                //     console.log(text)
                                // }}

                                placeholder="wyszukaj lub wprowadź nazwę podmiotu"
                            />
                        </Form.Item>
                        <Form.Item label="Adres wnioskodawcy" required>
                            <Space direction="vertical" style={{ rowGap: 0 }}>
                                <Space direction="horizontal">
                                    <Form.Item
                                        name="company_street"
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Podaj ulicę',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="ulica"
                                            style={{ width: 250 }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="company_house"
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Podaj nr domu',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="nr domu"
                                            style={{ width: 120 }}
                                        />
                                    </Form.Item>
                                    <Form.Item name="company_apartment">
                                        <Input
                                            placeholder="nr mieszkania"
                                            style={{ maxWidth: 120 }}
                                        />
                                    </Form.Item>
                                </Space>
                                <Space>
                                    <Form.Item
                                        name="company_postcode"
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Podaj kod pocztowy',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="kod pocztowy" />
                                    </Form.Item>
                                    <Form.Item
                                        name="company_city"
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Podaj miasto',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="miejscowość" />
                                    </Form.Item>
                                </Space>
                            </Space>
                        </Form.Item>
                    </FormSection>

                    <FormSection sectionName="Dane szablonu odpowiedzi">
                        <Row gutter={[8, 0]}>
                            <Col span={12}>
                                <Form.Item
                                    name="company_type_id"
                                    label="Podstawa prawna dla"
                                >
                                    <Select
                                        showSearch
                                        placeholder="podstawa prawna dla"
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
                                                value: 1,
                                                label: 'Bank',
                                            },
                                            {
                                                value: 2,
                                                label: 'Ośrodek pomocy społecznej',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="act_signature"
                                    label="Sygnatura akt"
                                >
                                    <Input placeholder="sygnatura akt" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Cel udostępnienia"
                            name="reason_of_request"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj cel udostępnienia',
                                },
                            ]}
                        >
                            <Input placeholder="wpisz cel udostępnienia" />
                        </Form.Item>
                        <Form.Item name="template_main_text" label="Odpowiedź">
                            <TextArea></TextArea>
                        </Form.Item>
                    </FormSection>

                    <FormSection sectionName="Dane sprawy w EZD">
                        <Form.Item
                            label="JRWA dla sprawy"
                            tooltip="asfasff f faafsffafsasf asfaf af"
                            name="jrwa_id"
                            rules={[
                                {
                                    type: 'number',
                                    required: true,
                                    message: 'Podaj jrwa',
                                },
                            ]}
                        >
                            <Select
                                style={{ maxWidth: 200 }}
                                placeholder="wybierz jrwa"
                                allowClear
                            >
                                <Option value={1}>6610</Option>
                                <Option value={2}>6611</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Nazwa koszulki w EZD"
                            name="ezd_name"
                            initialValue="UDO - "
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj nazwę koszulki dla EZD',
                                },
                            ]}
                        >
                            <Input placeholder="wprowadż nazwę koszulki"></Input>
                        </Form.Item>
                    </FormSection>

                    <FormSection sectionName="Dodatkowe informacje">
                        <Space>
                            <Form.Item
                                label="Priorytet sprawy"
                                name="importance_status_id"
                                initialValue={1}
                            >
                                <Radio.Group>
                                    <Radio.Button value={1}>
                                        Normalny
                                    </Radio.Button>
                                    <Radio.Button value={2}>
                                        Wysoki
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Czas odpowiedzi"
                                name="max_finish_date"
                            >
                                <DatePicker />
                            </Form.Item>
                        </Space>

                        <Form.Item name="comment" label="Dodatkowy opis">
                            <TextArea></TextArea>
                        </Form.Item>
                    </FormSection>

                    <Row style={{ marginTop: 50 }} justify="end">
                        <Col>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    loading={loading}
                                    htmlType="submit"
                                >
                                    Zapisz szablon
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </FormWrapper>
        </>
    )
}
