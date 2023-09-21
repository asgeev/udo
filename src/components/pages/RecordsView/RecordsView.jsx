//Import providers
import { RecordsViewProvider } from '@providers/RecordsViewProvider'
import { FirstDrawerProvider } from '@providers/FirstDrawerProvider'
import { SecondDrawerProvider } from '@providers/SecondDrawerProvider'
import { RichTextProvider } from '@providers/RichTextProvider'
//Import components
import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { RecordsViewTable } from '@molecules/RecorsViewTable/RecordsViewTable'
import { FirstDrawer } from '@organisms/FirstDrawer/FirstDrawer'

export const RecordsView = () => {
    return (
        <RecordsViewProvider>
            <FirstDrawerProvider>
                <SecondDrawerProvider>
                    <RichTextProvider>
                        <PageTitleHeader title="Podgląd zapisanych spraw" />
                        <RecordsViewTable />
                        <FirstDrawer />
                    </RichTextProvider>
                </SecondDrawerProvider>
            </FirstDrawerProvider>
        </RecordsViewProvider>
    )
}
