import { useEffect } from 'react'
import { Form, AutoComplete, Space, Input, Alert, Select, Spin } from 'antd'
import { useTheme } from 'styled-components'
import { FormSection } from '@molecules/FormSection/FormSection'
import { createCompanyDataOptions } from '@helpers/createCompanyDataOptions'
import { createCompanyTypeIdOptions } from '@helpers/createCompanyTypeIdOptions'
import { useGetRequestorsList } from '@hooks/useGetRequestorList'
import { useGetRequestorTypesList } from '@hooks/useGetRequestorTypesList'

export const CompanyDataFormSection = ({ editMode = false, setError }) => {
    const { colors } = useTheme()
    const form = Form.useFormInstance()

    const {
        data: requestorsList,
        isError: requestorsListError,
        isLoading,
    } = useGetRequestorsList()
    const { data: requestorTypesList, isError: requestorTypesListError } =
        useGetRequestorTypesList()

    useEffect(() => {
        if (requestorTypesListError || requestorsListError) {
            setError(true)
        }
    }, [requestorTypesListError, requestorsListError])

    const handleOnSelect = (value, option) => {
        console.log(option)
        form.setFieldValue('requestor_name', option?.name)
        form.setFieldValue('requestor_id', option?.id)
        form.setFieldValue('requestor_street', option?.street)
        form.setFieldValue('requestor_house', option?.house)
        form.setFieldValue('requestor_apartment', option?.apartment)
        form.setFieldValue('requestor_postcode', option?.postcode)
        form.setFieldValue('requestor_city', option?.city)
        form.setFieldValue('requestor_type_id', option?.requestor_type_id)
    }

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane wnioskodawcy"
            subTitle="Podaj dane dotyczące podmiotu wnioskującego"
            backgroundColor={colors.color_card_7}
            style={{ gridRow: 2 / 12, gridColumn: 1 }}
        >
            <Form.Item hidden={true} name="requestor_id">
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
                    options={createCompanyDataOptions(requestorsList)}
                    notFoundContent={
                        isLoading ? (
                            <Spin />
                        ) : (
                            ' ☹️ Brak wyników dla wyszukiwanej frazy'
                        )
                    }
                    onSelect={(value, option) => handleOnSelect(value, option)}
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
                    options={createCompanyTypeIdOptions(requestorTypesList)}
                />
            </Form.Item>
        </FormSection>
    )
}
