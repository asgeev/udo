import { Form } from 'antd'
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
                <ContentFromExternalApiCheckboxes
                    data={data}
                    inputName={'external_systems_checkbox'}
                    form={addForm}
                />
            )}
        </FormSection>
    )
}
