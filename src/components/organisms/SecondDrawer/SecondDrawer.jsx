import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import ContentFromExternalApiModal from '@molecules/ContentFromExternalApi/ContentFromExternalApiModal'

import { Drawer, Spin } from 'antd'

import { useJobs } from '@hooks/useJobs'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { JobsList } from '@molecules/JobsList/JobsList'

export const SecondDrawer = () => {
    const { isSecondDrawerVisible, closeSecondDrawer } =
        useSecondDrawerContext()

    const { currentRecordId } = useRecordsViewContext()

    const { data, isLoading, isError } = useJobs(currentRecordId)

    return (
        <Drawer
            width={600}
            title={`Zadania dla robota`}
            open={isSecondDrawerVisible}
            destroyOnClose={true}
            onClose={closeSecondDrawer}
            extra={<ContentFromExternalApiModal />}
        >
            {isError && (
                <p>
                    Wystąpił problem z pobieraniem danych spróbuj ponownie
                    później!
                </p>
            )}
            <Spin spinning={isLoading} />
            {data && <JobsList data={data} />}
        </Drawer>
    )
}
