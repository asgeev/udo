import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { EditFormDrawer } from '@organisms/EditFormDrawer/EditFormDrawer'
import { RecordsViewProvider } from '@providers/RecordsViewProvider'
import { EditDrawerProvider } from '@providers/EditDrawerProvider'
import { RecordsViewTable } from '@molecules/RecorsViewTable/RecordsViewTable'

export const RecordsView = () => {
    return (
        <RecordsViewProvider>
            <EditDrawerProvider>
                <PageTitleHeader title="Podgląd zapisanych spraw" />
                <RecordsViewTable />
                <EditFormDrawer />
            </EditDrawerProvider>
        </RecordsViewProvider>
    )
}
