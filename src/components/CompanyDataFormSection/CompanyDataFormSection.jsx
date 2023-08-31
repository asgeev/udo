import { useEffect, useState } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, AutoComplete, Space, Input, Alert, Select } from 'antd'
import WP_Instance from '../../services/WP_Instance'
import { createCompanyDataOptions } from '../../helpers/createCompanyDataOptions'
import { useTheme } from 'styled-components'
import { createCompanyTypeIdOptions } from '../../helpers/createCompanyTypeIdOptions'

export const CompanyDataFormSection = ({ setError, editMode }) => {
    const { colors } = useTheme()
    const form = Form.useFormInstance()
    const [companyData, setCompanyData] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRequestor, setSeclectedRequestor] = useState(null)
    const [companyTypesItems, setCompanyTypesItems] = useState([])

    const handleSetSelectedCompany = (value, options) => {
        setSeclectedRequestor(options)
    }

    const handleSetCompanyData = (data) => {
        setCompanyData(data)
    }
    const handleOnSearch = (query) => {
        setSearchQuery(query)
    }

    useEffect(() => {
        if (!editMode) {
            form.setFieldValue('requestor_id', selectedRequestor?.id)
            form.setFieldValue('requestor_street', selectedRequestor?.street)
            form.setFieldValue('requestor_house', selectedRequestor?.house)
            form.setFieldValue(
                'requestor_apartment',
                selectedRequestor?.apartment
            )
            form.setFieldValue(
                'requestor_postcode',
                selectedRequestor?.postcode
            )
            form.setFieldValue('requestor_city', selectedRequestor?.city)
            form.setFieldValue(
                'requestor_type_id',
                selectedRequestor?.requestor_type_id
            )
        }
    }, [selectedRequestor])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getRequestorList?company_name=${searchQuery}`)
            .then((response) => {
                handleSetCompanyData(response?.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [searchQuery])

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getRequestorTypesList`)
            .then((response) => {
                setCompanyTypesItems(response?.data)
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
    }, [])

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane wnioskodawcy"
            subTitle="Podaj dane dotyczące podmiotu wnioskującego"
            backgroundColor={colors.color_card_7}
            style={{ gridRow: 2 / 12, gridColumn: 1 }}
        >
            <Form.Item hidden={true} name="company_id">
                <Input />
            </Form.Item>
            <Alert
                message="Możesz wprowadzić swojego odbiorcę lub wyszukać z już istniejących"
                type="info"
                closable
                showIcon
                style={{ marginBottom: 10 }}
            />
            <Form.Item
                label="Nazwa wnioskodawcy"
                name="requestor_name"
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
                    notFoundContent={' ☹️ Brak wyników dla wyszukiwanej frazy'}
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
            <Form.Item
                label="Adres wnioskodawcy"
                required
                style={{ marginBottom: 0 }}
            >
                <Space wrap style={{ rowGap: 0 }}>
                    <Space wrap style={{ rowGap: 0 }}>
                        <Form.Item
                            name="requestor_street"
                            rules={[
                                {
                                    type: 'string',
                                    required: true,
                                    message: 'Podaj ulicę',
                                },
                            ]}
                        >
                            <Input placeholder="ulica" style={{ width: 250 }} />
                        </Form.Item>
                        <Form.Item
                            name="requestor_house"
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
                        <Form.Item name="requestor_apartment">
                            <Input
                                placeholder="nr mieszkania"
                                style={{ maxWidth: 120 }}
                            />
                        </Form.Item>
                    </Space>
                    <Space wrap style={{ rowGap: 0 }}>
                        <Form.Item
                            name="requestor_postcode"
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
                            name="requestor_city"
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
            <Form.Item
                name="requestor_type_id"
                label="Typ wnioskodawcy"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Wybierz typ wnioskodawcy',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="typ wnioskodawcy"
                    optionLabelProp="label"
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={createCompanyTypeIdOptions(companyTypesItems)}
                />
            </Form.Item>
        </FormSection>
    )
}
