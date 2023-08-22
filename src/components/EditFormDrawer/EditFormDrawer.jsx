import { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd'
import { EditForm } from '../EditForm/EditForm'
import { EditFormSecondDrawer } from '../EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormDrawerSkeletons } from '../EditFormDrawerSkeletons/EditFormDrawerSkeletons'
import WP_Instance from '../../services/WP_Instance'

export const EditFormDrawer = ({ recordId, open, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [initialFormData, setInitalFormData] = useState({})

    console.log(initialFormData)

    useEffect(() => {
        if (recordId) {
            setIsLoading(true)
            WP_Instance.get(`/udo/v1/getDataRequestById?id=${recordId}`)
                .then((response) => {
                    console.log(response)
                    setInitalFormData(response?.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [recordId])

    const showSecondDrawer = () => {
        setSecondDrawerOpen(true)
    }

    const onSecondDrawerClose = () => {
        setSecondDrawerOpen(false)
    }

    return (
        <Drawer
            title={`Edytuj zapytanie dla sprawy nr ${recordId}`}
            width={800}
            open={open}
            onClose={onDrawerClose}
            destroyOnClose={true}
        >
            <Button type="primary" onClick={showSecondDrawer}>
                Open second drawer
            </Button>
            {isLoading ? <EditFormDrawerSkeletons /> : <EditForm />}

            <EditFormSecondDrawer
                onSecondDrawerClose={onSecondDrawerClose}
                secondDrawerOpen={secondDrawerOpen}
            />
        </Drawer>
    )
}
