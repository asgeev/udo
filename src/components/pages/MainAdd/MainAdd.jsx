import { AddForm } from '@organisms/AddForm/AddForm'
import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { AddFormProvider } from '@providers/AddFormProvider'

export const MainAdd = () => {
    return (
        <>
            <PageTitleHeader title="Zarejestruj zapytanie" />
            <AddFormProvider>
                <AddForm />
            </AddFormProvider>
        </>
    )
}
