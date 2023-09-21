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
    } = useSecondDrawerContext()

    console.log(apiId)
    console.log(drawerData)

    return (
        <Drawer
            width={600}
            title={`Dane z systemu nr ${apiId}`}
            open={isSecondDrawerVisible}
            onClose={closeSecondDrawer}
            destroyOnClose={true}
            afterOpenChange={(open) => {
                if (open) {
                    fetchDataForSecondDrawer()
                }
            }}
        >
            <Space
                direction="vertical"
                style={{ marginBottom: 30, width: '100%' }}
            >
                {error && (
                    <Alert
                        showIcon
                        message="Error Text"
                        description={error}
                        type="error"
                    />
                )}
                {/* {!error && (
                    <Alert
                        type="warning"
                        showIcon
                        description="Uwaga! Wyświetlane dane w tym oknie są danymi testowymi dlatego, te same dane wyświetlają się dla każdej zarejestrowanej sprawy"
                    />
                )} */}
            </Space>

            <Spin spinning={isDrawerLoading}>
                {drawerData &&
                    (() => {
                        switch (apiId) {
                            case 1:
                                return <CwuContainer />
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
