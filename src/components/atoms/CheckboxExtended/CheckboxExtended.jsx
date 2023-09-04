import { useState } from 'react'
import styled from 'styled-components'
import { Typography, Form, Space, Checkbox } from 'antd'

const CustomFormItem = styled.div`
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid ${({ isChecked }) => (isChecked ? '#4096ff' : '#d9d9d9')};
    margin-bottom: 20px;

    &:hover {
        border-color: ${({ disabled }) => (disabled ? null : '#4096ff')};
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'unset')};
    }
`

export const CheckboxExtended = ({
    name,
    checkboxName,
    description,
    disabled,
}) => {
    const [isChecked, setIsChecked] = useState(false)
    const { Text } = Typography

    const handleIsChecked = (e) => {
        setIsChecked(e.target.checked)
    }

    return (
        <Form.Item name={name} valuePropName="checked" style={{ margin: 0 }}>
            <CustomFormItem isChecked={isChecked} disabled={disabled}>
                <Space direction="vertical" size={1}>
                    <Checkbox onChange={handleIsChecked} disabled={disabled}>
                        {checkboxName}
                    </Checkbox>
                    {description && (
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 13,
                            }}
                            type="secondary"
                        >
                            {description}
                        </Text>
                    )}
                </Space>
            </CustomFormItem>
        </Form.Item>
    )
}
