import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { RecordsViewProvider } from '@providers/RecordsViewProvider'
import { DrawersProvider } from '@providers/DrawersProvider'
import { RecordsViewTable } from '@molecules/RecorsViewTable/RecordsViewTable'
import { FirstDrawer } from '@organisms/FirstDrawer/FirstDrawer'

export const RecordsView = () => {
    return (
        <RecordsViewProvider>
            <DrawersProvider>
                <PageTitleHeader title="Podgląd zapisanych spraw" />
                <RecordsViewTable />
                <FirstDrawer />
            </DrawersProvider>
        </RecordsViewProvider>
    )
}
