import { Alert } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import { CheckboxExtended } from '@atoms/CheckboxExtended/CheckboxExtended'

export const ReplyTemplateFormSection = ({ editMode = false }) => {
    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Alert
                showIcon
                message="Dane z wybranego poniżej systemu będziesz mógł/mogła wykorzystać przy tworzeniu odpowiedzi."
                type="info"
                closeIcon
                style={{ marginBottom: 24 }}
            />
            <CheckboxExtended
                name="CWU"
                checkboxName="Centralny Wykaz Ubezpieczonych"
                description="dane adresowe, status ubezpeczenia, karta ekuz"
            />
            <CheckboxExtended
                disabled
                name="SOFU"
                checkboxName="System obsługi Formularzy Unijnych"
                description="świadczenia zdrowotne w czasie tymczasowego pobytu na terenie inneg państwa UE/EFTA"
            />
            <CheckboxExtended
                disabled
                name="BO"
                checkboxName="Bussines Objects"
                description="weryfikacja realizacji recept na leki wszystkie lub zaliczane do grupy N (kwalifikacja ATC)"
            />
        </FormSection>
    )
}
