import { Descriptions } from 'antd'

export const TableRowDescription = ({ data }) => {
    const items = [
        {
            key: '1',
            label: 'RPW',
            span: 2,
            children: data?.rpw,
        },
        {
            key: '2',
            label: 'Sygnatura akt zapytania',
            children: data?.requestor_act_signature,
        },
        {
            key: '3',
            label: 'Nazwa podmiotu',
            span: 1,
            children: data?.company_name,
        },
        {
            key: '4',
            label: 'Adres',
            span: 2,
            children: `${data?.company_street} ${data?.company_house} / ${data?.company_apartment} ______ ${data?.company_postcode} ${data?.company_city}`,
        },
    ]

    return (
        <Descriptions
            layout="vertical"
            size="small"
            style={{ marginLeft: 48 }}
            items={items}
        />
    )
}
