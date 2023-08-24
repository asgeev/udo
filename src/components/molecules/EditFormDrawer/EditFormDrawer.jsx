import { useState } from 'react'
import { Drawer } from 'antd'
import { EditForm } from '@organisms/EditForm/EditForm'
import { EditFormSecondDrawer } from '@molecules/EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormProvider } from '@providers/EditFormProvider'
import { RichTextProvider } from '@providers/RichTextProvider'

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
                    push={{ distance: '100' }}
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
