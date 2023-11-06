import { Drawer } from 'antd'
import { EditForm } from '@organisms/EditForm/EditForm'
import { useFirstDrawerContext } from '@hooks/useFirstDrawerContext'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { SecondDrawer } from '@organisms/SecondDrawer/SecondDrawer'
import { EditFormProvider } from '@providers/EditFormProvider'
import { RequestHistory } from '@molecules/RequestHistory/RequestHistory'

export const FirstDrawer = () => {
    const { currentRecordId } = useRecordsViewContext()
    const { isFirstDrawerVisible, closeDrawer } = useFirstDrawerContext()

    return (
        <Drawer
            title={`Edytuj zapytanie dla sprawy nr ${currentRecordId}`}
            width={900}
            push={{ distance: '100' }}
            open={isFirstDrawerVisible}
            destroyOnClose={true}
            onClose={closeDrawer}
            extra={<RequestHistory />}
        >
            <EditFormProvider>
                <EditForm />
                <SecondDrawer />
            </EditFormProvider>
        </Drawer>
    )
}
