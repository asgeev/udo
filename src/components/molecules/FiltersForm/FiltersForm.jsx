import { Button, Form, Input, Space } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { SyncOutlined } from '@ant-design/icons'

export const FiltersForm = ({ onFiltersChange }) => {
    const { Search } = Input

    //set searchValue after refresh page
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get('search_query')

    const { refetch } = useRecordsViewContext()

    return (
        <Form
            name="filtersForm"
            onValuesChange={(values) => onFiltersChange(values)}
        >
            <Space align="baseline">
                <Form.Item
                    name="search_query"
                    label="Wyszukaj"
                    initialValue={searchValue}
                >
                    <Search
                        allowClear
                        style={{
                            width: 300,
                        }}
                        enterButton
                    />
                </Form.Item>
                <Button
                    onClick={refetch}
                    type="default"
                    icon={<SyncOutlined />}
                >
                    Odśwież
                </Button>
            </Space>

            {/* <Space size={'large'}>
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
            </Space> */}
        </Form>
    )
}
