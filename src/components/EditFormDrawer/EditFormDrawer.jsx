import { useState } from 'react'
import { Drawer, Button } from 'antd'
import { EditForm } from '../EditForm/EditForm'
import { EditFormSecondDrawer } from '../EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormDrawerSkeletons } from '../EditFormDrawerSkeletons/EditFormDrawerSkeletons'
import { EditFormProvider } from '../EditFormProvider/EditFormProvider'

export const EditFormDrawer = ({ recordId, open, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const showSecondDrawer = () => {
        setSecondDrawerOpen(true)
    }

    const onSecondDrawerClose = () => {
        setSecondDrawerOpen(false)
    }

    return (
        <>
            <Drawer
                title={`Edytuj zapytanie dla sprawy nr ${recordId}`}
                width={800}
                push={{ distance: '360' }}
                open={open}
                destroyOnClose={true}
                onClose={onDrawerClose}
            >
                <Button type="primary" onClick={showSecondDrawer}>
                    Open second drawer
                </Button>
                {isLoading ? (
                    <EditFormDrawerSkeletons />
                ) : (
                    <EditFormProvider
                        recordId={recordId}
                        setIsLoading={setIsLoading}
                    >
                        <EditForm />
                    </EditFormProvider>
                )}

                <EditFormSecondDrawer
                    onSecondDrawerClose={onSecondDrawerClose}
                    secondDrawerOpen={secondDrawerOpen}
                />
            </Drawer>
        </>
    )
}
