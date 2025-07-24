import { Alert, Space } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import ContentFromExternalApiCheckboxes from '@molecules/ContentFromExternalApi/ContentFromExternalApiCheckboxes'

//Import fetching external systems structure
import { useExternalSystems } from '@hooks/useExternalSystems'

export const ReplyTemplateFormSection = ({ editMode = false }) => {
    const { data } = useExternalSystems()

    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Space direction="vertical" size={20}>
                <Alert
                    showIcon
                    message="Dane z wybranego poniżej systemu będziesz mógł/mogła wykorzystać przy tworzeniu odpowiedzi."
                    type="info"
                    closeIcon
                />
                <ContentFromExternalApiCheckboxes
                    data={data}
                    inputName={'external_systems_checkbox'}
                />
            </Space>
        </FormSection>
    )
}
