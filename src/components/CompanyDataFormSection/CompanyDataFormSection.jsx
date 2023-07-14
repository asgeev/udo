import { useEffect, useState } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, AutoComplete, Space, Input } from 'antd'
import WP_Instance from '../../services/WP_Instance'

const createCompanyDataOptions = (data) => {
    let newData = []

    data?.forEach((element) => {
        newData.push({
            key: element.id,
            value: element.name,
            label: `${element.name} |  Adres: ${element.street}  ${element.house}  ${element.apartment}  ${element.postcode}  ${element.city}`,
            ...element,
        })
    })
    return newData
}
const company = [
    {
        id: '1',
        name: 'Bank pocztowy 2',
        street: 'pocztowa',
        house: '20',
        apartment: '256',
        postcode: '20-300',
        city: 'Łódź',
        company_type_id: '1',
    },
    {
        id: '2',
        name: 'afs',
        street: 'afs',
        house: 'af',
        apartment: 'a',
        postcode: 'fa',
        city: 'asf',
        company_type_id: '2',
    },
    {
        id: '3',
        name: 'afs',
        street: 'afs',
        house: 'af',
        apartment: 'a',
        postcode: 'fa',
        city: 'asf',
        company_type_id: '2',
    },
    {
        id: '4',
        name: 'podmiot2',
        street: 'af',
        house: 'af',
        apartment: null,
        postcode: 'af',
        city: 'af',
        company_type_id: '2',
    },
    {
        id: '5',
        name: 'podmiot2',
        street: 'asfafs',
        house: 'sgd',
        apartment: null,
        postcode: 'sdg',
        city: 'sgd',
        company_type_id: '2',
    },
    {
        id: '6',
        name: 'asf',
        street: 'afs',
        house: 'asf',
        apartment: null,
        postcode: 'afs',
        city: 'asf',
        company_type_id: '1',
    },
    {
        id: '7',
        name: 'asf',
        street: 'afs',
        house: 'asf',
        apartment: null,
        postcode: 'afs',
        city: 'asf',
        company_type_id: '1',
    },
]

export const CompanyDataFormSection = () => {
    const form = Form.useFormInstance()
    const [companyData, setCompanyData] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCompany, setSeclectedCompany] = useState(null)

    const handleSetSelectedCompany = (value, options) => {
        setSeclectedCompany(options)
    }

    const handleSetCompanyData = (data) => {
        setCompanyData(data)
    }
    const handleOnSearch = (query) => {
        setSearchQuery(query)
    }

    useEffect(() => {
        form.setFieldValue('company_street', selectedCompany?.street)
        form.setFieldValue('company_house', selectedCompany?.house)
        form.setFieldValue('company_apartment', selectedCompany?.apartment)
        form.setFieldValue('company_postcode', selectedCompany?.postcode)
        form.setFieldValue('company_city', selectedCompany?.city)
    }, [selectedCompany])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getCompanyList?company_name=${searchQuery}`)
            .then((response) => {
                handleSetCompanyData(response?.data)
            })
            .catch((error) => {
                console.error(error)
                handleSetCompanyData(company) //
            })
    }, [searchQuery])

    // useEffect(() => {}, [selectedCompany])

    return (
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
                    options={createCompanyDataOptions(companyData)}
                    notFoundContent="Przykro nam ale nie znaleźliśmy żadnego podmiotu"
                    onSelect={handleSetSelectedCompany}
                    onSearch={handleOnSearch}
                    placeholder="wyszukaj lub wprowadź nazwę podmiotu"
                    allowClear
                    filterOption={(inputValue, option) =>
                        option.label
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
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
                            // initialValue={selectedCompany?.street}
                            // getValueFromEvent={selectedCompany?.street}
                            // shouldUpdate
                        >
                            <Input placeholder="ulica" style={{ width: 250 }} />
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
    )
}
