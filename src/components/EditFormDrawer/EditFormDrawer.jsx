import { useContext, useState } from 'react'
import { Drawer } from 'antd'
import { EditForm } from '../EditForm/EditForm'
import { EditFormSecondDrawer } from '../EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormDrawerSkeletons } from '../EditFormDrawerSkeletons/EditFormDrawerSkeletons'
import { EditFormProvider } from '../Providers/EditFormProvider/EditFormProvider'
import { RichTextProvider } from '../Providers/RichTextProvider/RichTextProvider'

export const EditFormDrawer = ({ recordId, drawerOpen, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)

    const showSecondDrawer = () => {
        setSecondDrawerOpen(true)
    }

    const onSecondDrawerClose = () => {
        setSecondDrawerOpen(false)
    }

    return (
        <>
            <RichTextProvider>
                <Drawer
                    title={`Edytuj zapytanie dla sprawy nr ${recordId}`}
                    width={900}
                    // push={{ distance: '100' }}
                    open={drawerOpen}
                    destroyOnClose={true}
                    onClose={onDrawerClose}
                >
                    <EditFormProvider
                        recordId={recordId}
                        showSecondDrawer={showSecondDrawer}
                    >
                        <EditForm />
                    </EditFormProvider>

                    <EditFormSecondDrawer
                        onSecondDrawerClose={onSecondDrawerClose}
                        secondDrawerOpen={secondDrawerOpen}
                    />
                </Drawer>
            </RichTextProvider>
        </>
    )
}
