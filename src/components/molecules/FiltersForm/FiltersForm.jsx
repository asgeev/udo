import { Form, Input, Switch, Alert, Space, Radio } from 'antd'

export const FiltersForm = ({ onFiltersChange }) => {
    const { Search } = Input

    return (
        <Form
            name="filtersForm"
            onValuesChange={(values) => onFiltersChange(values)}
        >
            <Alert
                description="Na ten moment możesz wyszukiwać jedynie po nazwisku. Kolejne filtry zostaną przygotowane w najbliższym czasie. 🚀 "
                type="info"
                showIcon
                closable
                style={{ marginBottom: 30 }}
            />
            <Form.Item name="search_query" label="Wyszukaj nazwisko">
                <Search
                    allowClear
                    style={{
                        width: 300,
                    }}
                    enterButton
                />
            </Form.Item>
            <Space size={'large'}>
                <Form.Item name="my" label="Moje" valuePropName="checked">
                    <Switch disabled />
                </Form.Item>
                <Form.Item
                    name="show_finished"
                    label="Zakończone"
                    valuePropName="checked"
                >
                    <Switch disabled />
                </Form.Item>
                <Form.Item
                    name="show_error"
                    label="Błąd"
                    valuePropName="checked"
                >
                    <Switch disabled />
                </Form.Item>
                <Form.Item label="JRWA" name="jrwa" initialValue="all">
                    <Radio.Group disabled>
                        <Radio.Button value="all">Wszystkie</Radio.Button>
                        <Radio.Button value="6610">6610</Radio.Button>
                        <Radio.Button value="6611">6611</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Space>
        </Form>
    )
}
