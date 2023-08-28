import { useState, useContext } from 'react'
import { Drawer, Button } from 'antd'
import { EditForm } from '../EditForm/EditForm'
import { EditFormSecondDrawer } from '../EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormDrawerSkeletons } from '../EditFormDrawerSkeletons/EditFormDrawerSkeletons'
import { EditFormProvider } from '../EditFormProvider/EditFormProvider'

export const EditFormDrawer = ({ recordId, drawerOpen, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)

    // console.log(contexti)

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
                width={900}
                // push={{ distance: '100' }}
                open={drawerOpen}
                destroyOnClose={true}
                onClose={onDrawerClose}
            >
                <Button type="primary" onClick={showSecondDrawer}>
                    Open second drawer
                </Button>

                <EditFormProvider
                    recordId={recordId}
                    // setIsLoading={setIsLoading}
                    open={open}
                >
                    <EditForm />
                </EditFormProvider>

                <EditFormSecondDrawer
                    onSecondDrawerClose={onSecondDrawerClose}
                    secondDrawerOpen={secondDrawerOpen}
                />
            </Drawer>
        </>
    )
}
