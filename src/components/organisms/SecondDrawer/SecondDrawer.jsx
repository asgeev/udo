import { Drawer, Spin, Alert, Space } from 'antd'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { CwuContainer } from '@molecules/ContentFromExternalApi/CWU/CwuContainer'

export const SecondDrawer = () => {
    const {
        fetchDataForSecondDrawer,
        isDrawerLoading,
        error,
        drawerData,
        isSecondDrawerVisible,
        closeSecondDrawer,
        apiId,
        setInitalState,
    } = useSecondDrawerContext()

    return (
        <Drawer
            width={600}
            title={`Dane z systemu nr ${apiId}`}
            open={isSecondDrawerVisible}
            destroyOnClose={true}
            onClose={closeSecondDrawer}
            afterOpenChange={(open) => {
                if (open) {
                    fetchDataForSecondDrawer()
                } else {
                    setInitalState()
                }
            }}
        >
            <Space
                direction="vertical"
                style={{ marginBottom: 30, width: '100%' }}
            >
                {error.state && (
                    <Alert
                        showIcon
                        message="Błąd"
                        description={error.message}
                        type="error"
                    />
                )}
                {!error.state && (
                    <Alert
                        type="warning"
                        showIcon
                        description="Uwaga! Wyświetlane dane są danymi testowymi!"
                    />
                )}
            </Space>

            <Spin spinning={isDrawerLoading}>
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
            </Spin>
        </Drawer>
    )
}
