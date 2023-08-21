import { useState } from 'react'
import { Drawer, Button } from 'antd'
import { EditForm } from '../EditForm/EditForm'

export const EditFormDrawer = ({ recordId, open, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)
    // const formContext = createContext()

    const showSecondDrawer = () => {
        setSecondDrawerOpen(true)
    }
    const onSecondDrawerClose = () => {
        setSecondDrawerOpen(false)
    }

    return (
        <Drawer
            title={`Edytuj zapytanie dla ${recordId}`}
            size="large"
            open={open}
            onClose={onDrawerClose}
        >
            <Button type="primary" onClick={showSecondDrawer}>
                Open second drawer
            </Button>
            <EditForm />
            <Drawer
                title="Dane z systemu"
                open={secondDrawerOpen}
                onClose={onSecondDrawerClose}
            ></Drawer>
        </Drawer>
    )
}
