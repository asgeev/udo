import { Drawer, Spin } from 'antd'
import { useDrawersContext } from '@hooks/useDrawersContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'

export const SecondDrawer = () => {
    const { isSecondDrawerVisible, closeSecondDrawer } = useDrawersContext()
    const { fetchDataForSecondDrawer, isDrawerLoading } =
        useSecondDrawerContext()

    return (
        <Drawer
            width={600}
            title="Dane z systemu"
            open={isSecondDrawerVisible}
            onClose={closeSecondDrawer}
            destroyOnClose={true}
            afterOpenChange={fetchDataForSecondDrawer}
        >
            <Spin spinning={isDrawerLoading}></Spin>
        </Drawer>
    )
}
