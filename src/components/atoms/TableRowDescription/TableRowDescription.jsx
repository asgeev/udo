import { Descriptions, Typography, Divider } from 'antd'

export const TableRowDescription = ({ data }) => {
    const { Text } = Typography

    const {
        rpw,
        requestor_act_signature,
        requestor_name,
        requestor_street,
        requestor_house,
        requestor_apartment,
        requestor_postcode,
        requestor_city,
        nr_sprawy,
        koszulka_id,
        comment,
    } = data

    const items = [
        {
            key: '1',
            label: 'Numer sprawy',
            span: 4,
            children: nr_sprawy,
        },
        {
            key: '2',
            span: 4,
            label: 'Numer koszulki',
            children: koszulka_id,
        },
        {
            key: '3',
            label: 'RPW',
            span: 4,
            children: rpw,
        },
        {
            key: '4',
            label: 'Sygnatura akt zapytania',
            span: 4,
            children: requestor_act_signature,
        },
        {
            key: '5',
            label: 'Nazwa wnioskodawcy',
            span: 8,
            children: requestor_name,
        },
        {
            key: '6',
            label: 'Adres wnioskodawcy',
            span: 8,
            children: (
                <>
                    ulica: {requestor_street} {requestor_house}
                    {requestor_apartment && `/ ${requestor_apartment}`}
                    <Divider type="vertical" />
                    {requestor_postcode} {requestor_city}
                </>
            ),
        },

        {
            key: '7',
            label: 'Dodatkowy opis',
            span: 4,
            children: comment,
        },
    ]

    return (
        <Descriptions
            bordered
            style={{ marginLeft: 48 }}
            column={8}
            items={items}
        />
    )
}
