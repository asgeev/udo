import { Drawer } from 'antd'
import { EditForm } from '@organisms/EditForm/EditForm'
import { EditFormProvider } from '@providers/EditFormProvider'
import { RichTextProvider } from '@providers/RichTextProvider'
import { useDrawersContext } from '@hooks/useDrawersContext'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { SecondDrawerProvider } from '@providers/SecondDrawerProvider'
import { SecondDrawer } from '@organisms/SecondDrawer/SecondDrawer'

export const FirstDrawer = () => {
    const { currentRecordId } = useRecordsViewContext()
    const { isFirstDrawerVisible, closeDrawer, showSecondDrawer } =
        useDrawersContext()

    return (
        <RichTextProvider>
            <Drawer
                title={`Edytuj zapytanie dla sprawy nr ${currentRecordId}`}
                width={900}
                push={{ distance: '100' }}
                open={isFirstDrawerVisible}
                destroyOnClose={true}
                onClose={closeDrawer}
            >
                <EditFormProvider
                    recordId={currentRecordId}
                    showSecondDrawer={showSecondDrawer}
                >
                    <EditForm />
                </EditFormProvider>
                <SecondDrawerProvider>
                    <SecondDrawer />
                </SecondDrawerProvider>
            </Drawer>
        </RichTextProvider>
    )
}
