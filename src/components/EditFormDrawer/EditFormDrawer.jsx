import { useState, useEffect } from 'react'
import { Drawer, Button, Form } from 'antd'
import { EditForm } from '../EditForm/EditForm'
import { EditFormSecondDrawer } from '../EditFormSecondDrawer/EditFormSecondDrawer'
import { EditFormDrawerSkeletons } from '../EditFormDrawerSkeletons/EditFormDrawerSkeletons'
import WP_Instance from '../../services/WP_Instance'
import dayjs from 'dayjs'

export const EditFormDrawer = ({ recordId, open, onDrawerClose }) => {
    const [secondDrawerOpen, setSecondDrawerOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [initialFormData, setInitalFormData] = useState({})

    const createNewObjectWithValidDate = (initialFormData) => {
        console.clear()
        console.log(`Response obejct ${initialFormData}`)

        let newObject = {
            ...initialFormData,
            inflow_date:
                initialFormData.inflow_date &&
                dayjs(initialFormData.inflow_date),

            birth_date:
                initialFormData.birth_date && dayjs(initialFormData.birth_date),

            max_finish_date:
                initialFormData.max_finish_date &&
                dayjs(initialFormData.max_finish_date),
        }

        console.log(`New object ${newObject}`)

        return newObject
    }

    useEffect(() => {
        if (recordId) {
            setIsLoading(true)
            WP_Instance.get(`/udo/v1/getDataRequestById?id=${recordId}`)
                .then((response) => {
                    setInitalFormData(
                        createNewObjectWithValidDate(response.data)
                    )
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
                <EditForm initialValues={initialFormData} />
            )}

            <EditFormSecondDrawer
                onSecondDrawerClose={onSecondDrawerClose}
                secondDrawerOpen={secondDrawerOpen}
            />
        </Drawer>
    )
}
