import { FormSection } from '../FormSection/FormSection'
import { Alert } from 'antd'
import { FullCheckboxForm } from '../FullCheckboxForm/FullCheckboxForm'
import { RichTextEditor } from '../RichTextEditor/RichTextEditor'

export const ReplyTemplateFormSectionEditMode = ({ setError, editMode }) => {
    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <RichTextEditor />
        </FormSection>
    )
}
