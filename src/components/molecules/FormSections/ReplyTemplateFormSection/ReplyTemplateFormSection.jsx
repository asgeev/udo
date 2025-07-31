import { Space, Form, Typography } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import ContentFromExternalApiCheckboxes from '@molecules/ContentFromExternalApi/ContentFromExternalApiCheckboxes'

//Import fetching external systems structure
import { useExternalSystems } from '@hooks/useExternalSystems'
import { useAddFormContext } from '@hooks/useAddFormContext'
import EmptyFieldsAlert from '@atoms/EmptyFieldsAlert/EmptyFieldsAlert'

export const ReplyTemplateFormSection = ({ editMode = false }) => {
    const { data } = useExternalSystems()
    const { addForm } = useAddFormContext()

    const firstName = Form.useWatch('first_name', addForm)
    const lastName = Form.useWatch('last_name', addForm)
    const pesel = Form.useWatch('pesel', addForm)

    return (
        <FormSection
            editMode={editMode}
            sectionName="Automatyczna generacja odpowiedzi"
            subTitle="Zleć zadania robotowi, który automatycznie wygeneruje odpowiedź"
        >
            {!firstName || !lastName || !pesel ? (
                <EmptyFieldsAlert />
            ) : (
                <Space direction="vertical" size={16}>
                    <Typography.Text strong>
                        Wybierz zadania dla robota :
                    </Typography.Text>
                    <ContentFromExternalApiCheckboxes
                        data={data}
                        inputName={'external_systems_checkbox'}
                    />
                </Space>
            )}
        </FormSection>
    )
}
