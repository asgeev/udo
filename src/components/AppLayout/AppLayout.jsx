import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, theme } from 'antd'
import { StyledLayout } from './AppLayout.styles'
import { AppHeader } from '../AppHeader/AppHeader'
import { AppAsideMenu } from '../AppAsideMenu/AppAsideMenu'

export const AppLayout = () => {
    const { Content } = Layout
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    return (
        <>
            <StyledLayout>
                <AppAsideMenu />

                <Layout>
                    <AppHeader />
                    <Layout
                        style={{
                            padding: '0 24px  24px',
                            marginLeft: 260,
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        ></Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                overflowY: 'hidden',
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </StyledLayout>
        </>
    )
}
