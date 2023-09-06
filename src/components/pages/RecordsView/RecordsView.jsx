import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageTitleHeader } from '@atoms/PageTitleHeader/PageTitleHeader'
import { EditFormDrawer } from '@molecules/EditFormDrawer/EditFormDrawer'
import { RecordsViewProvider } from '@providers/RecordsViewProvider'
import { EditDrawerProvider } from '@providers/EditDrawerProvider'
import { RecordsViewTable } from '@molecules/RecorsViewTable/RecordsViewTable'
export const RecordsView = () => {
    // const [drawerOpen, setDrawerOpen] = useState(false)
    // const [recordId, setRecordId] = useState(null)

    const showDrawer = (recordId) => {
        setDrawerOpen(true)
        setRecordId(recordId)
    }
    const onDrawerClose = () => {
        setDrawerOpen(false)
        // navigate(location.pathname, {})
    }

    let location = useLocation()
    const navigate = useNavigate()
    // const recordIdFromLink = location.state?.recordId

    // useEffect(() => {
    //     console.log(recordIdFromLink)
    //     if (recordIdFromLink) {
    //         showDrawer(recordIdFromLink)
    //     }
    // }, [recordIdFromLink])

    return (
        <RecordsViewProvider>
            <EditDrawerProvider>
                <PageTitleHeader title="Podgląd zapisanych spraw" />
                <RecordsViewTable />
                <EditFormDrawer />
            </EditDrawerProvider>
        </RecordsViewProvider>
    )
}
