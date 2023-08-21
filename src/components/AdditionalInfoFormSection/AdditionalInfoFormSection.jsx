import { useState, useEffect } from 'react'
import { FormSection } from '../FormSection/FormSection'
import { Form, DatePicker, Input } from 'antd'
import { useTheme } from 'styled-components'

export const AdditionalInfoFormSection = ({ setError, editMode }) => {
    const { TextArea } = Input
    const { colors } = useTheme()

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dodatkowe informacje"
            backgroundColor={colors.color_card_2}
        >
            <Form.Item label="Czas odpowiedzi" name="max_finish_date">
                <DatePicker />
            </Form.Item>

            <Form.Item name="comment" label="Dodatkowy opis">
                <TextArea></TextArea>
            </Form.Item>
        </FormSection>
    )
}
