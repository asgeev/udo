import { Drawer } from 'antd'

export const EditFormSecondDrawer = ({
    secondDrawerOpen,
    onSecondDrawerClose,
}) => {
    return (
        <Drawer
            width={400}
            title="Dane z systemu"
            open={secondDrawerOpen}
            onClose={onSecondDrawerClose}
        ></Drawer>
    )
}
