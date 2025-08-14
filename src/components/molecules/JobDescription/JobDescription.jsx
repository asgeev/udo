import { Popover, Card, Collapse, DatePicker, Tag, Flex } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const TagsList = ({ arr = [] }) =>
    arr?.map((item, index) => (
        <Tag title={item} key={index}>
            {item?.substring(0, 50)}
        </Tag>
    ))

export const JobDescription = ({
    title,
    dateFrom,
    dateTo,
    columns,
    options,
    rodzaje,
    zakresy,
}) => {
    const { RangePicker } = DatePicker
    const collapseItems = [
        {
            key: '1',
            label: 'Opcje',
            children: <TagsList arr={options} />,
            collapsible: !options ? 'disabled' : null,
        },
        {
            key: '2',
            label: 'Kolumny',
            children: <TagsList arr={columns} />,
            collapsible: !columns ? 'disabled' : null,
        },
        {
            key: '3',
            label: 'Rodzaje świadczeń',
            children: <TagsList arr={rodzaje} />,
            collapsible: !rodzaje ? 'disabled' : null,
        },
        {
            key: '4',
            label: 'Zakresy świadczeń',
            children: <TagsList arr={zakresy} />,
            collapsible: !zakresy ? 'disabled' : null,
        },
    ]

    const content = (
        <Card style={{ width: 400 }} title={title} size="small">
            <Flex vertical gap={8}>
                <RangePicker
                    defaultValue={[dayjs(dateFrom), dayjs(dateTo)]}
                    inputReadOnly={true}
                    disabled
                />
                <Collapse items={collapseItems} size="small" />
            </Flex>
        </Card>
    )

    return (
        <Popover content={content} style={{ width: 400 }}>
            <EyeOutlined key={'list-item-created_time'} />
        </Popover>
    )
}
