import { Drawer, Alert } from 'antd'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { CwuContainer } from '@molecules/ContentFromExternalApi/CWU/CwuContainer'
import ContentFromExternalApiModal from '@molecules/ContentFromExternalApi/ContentFromExternalApiModal'

export const SecondDrawer = () => {
    const { drawerData, isSecondDrawerVisible, closeSecondDrawer, apiId } =
        useSecondDrawerContext()

    return (
        <Drawer
            width={600}
            title={`Dane z systemu nr ${apiId}`}
            open={isSecondDrawerVisible}
            destroyOnClose={true}
            onClose={closeSecondDrawer}
            extra={<ContentFromExternalApiModal />}
        >
            {(() => {
                switch (apiId) {
                    case 1:
                        return <CwuContainer data={drawerData} />
                    case 2:
                        return <p>Case 2</p>
                    case 3:
                        return <p>Case 3</p>
                    case 4:
                        return <p>Case 4</p>
                    default:
                        return (
                            <Alert
                                showIcon
                                type="error"
                                message="Błąd"
                                description="Ups! Coś poszło nie tak!"
                            />
                        )
                }
            })()}
        </Drawer>
    )
}
