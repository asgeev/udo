import { Alert } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import { CheckboxExtended } from '@atoms/CheckboxExtended/CheckboxExtended'

export const ReplyTemplateFormSection = ({ setError, editMode }) => {
    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            {/* <Form.Item label="Cel udostępnienia" name="reason_of_request">
                <Input placeholder="wpisz cel udostępnienia" />
            </Form.Item> */}
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
                name="KPL"
                checkboxName="Koszt Leczenia Pacjenta"
                description="informacje medyczne, szczegółowe informacje dotyczące udzielonych świadczeń"
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
            {/* <Form.Item name="template_main_text" label="Treść odpowiedzi">
                <RichTextEditor formField="template_main_text" />
            </Form.Item> */}
        </FormSection>
    )
}
