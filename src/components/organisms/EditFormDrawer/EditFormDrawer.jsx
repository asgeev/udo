import { Drawer } from 'antd'
import { EditForm } from '@organisms/EditForm/EditForm'
import { SecondDrawer } from '@organisms/EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormProvider } from '@providers/EditFormProvider'
import { RichTextProvider } from '@providers/RichTextProvider'
import { useEditDrawerContext } from '@hooks/useEditDrawerContext'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'

export const EditFormDrawer = () => {
    const { currentRecordId } = useRecordsViewContext()
    const { isDrawerVisible, closeDrawer, showSecondDrawer } =
        useEditDrawerContext()

    return (
        <RichTextProvider>
            <Drawer
                title={`Edytuj zapytanie dla sprawy nr ${currentRecordId}`}
                width={900}
                push={{ distance: '100' }}
                open={isDrawerVisible}
                destroyOnClose={true}
                onClose={closeDrawer}
            >
                <EditFormProvider
                    recordId={currentRecordId}
                    showSecondDrawer={showSecondDrawer}
                >
                    <EditForm />
                </EditFormProvider>

                <SecondDrawer />
            </Drawer>
        </RichTextProvider>
    )
}
