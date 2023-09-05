import { Form, DatePicker, Input } from 'antd'
import { useTheme } from 'styled-components'
import { FormSection } from '@molecules/FormSection/FormSection'

export const AdditionalInfoFormSection = ({ editMode = false }) => {
    const { TextArea } = Input
    const { colors } = useTheme()

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dodatkowe informacje"
            subTitle="Dodatkowe informacje pomagające identyfikację sprawy"
            backgroundColor={colors.color_card_2}
        >
            <Form.Item label="Czas odpowiedzi" name="max_finish_date">
                <DatePicker format={'YYYY-MM-DD'} />
            </Form.Item>

            <Form.Item name="comment" label="Dodatkowy opis">
                <TextArea></TextArea>
            </Form.Item>
        </FormSection>
    )
}
