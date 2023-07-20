import { useState } from 'react'
import { Outlet, useLocation, NavLink } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd'
import { StyledLayout } from './AppLayout.styles'
import { AppHeader } from '../AppHeader/AppHeader'
import { AppAsideMenu } from '../AppAsideMenu/AppAsideMenu'
import { HomeOutlined } from '@ant-design/icons'

const breadcrumbNameMap = {
    '/': 'Główna',
    '/dodawanie': 'Dodawanie',
    // '/apps/2/detail': 'Detail',     <-- sample of more nested items
}

export const AppLayout = () => {
    const { Content } = Layout
    const [collapsed, setCollapsed] = useState(false)

    //Code from https://ant.design/components/breadcrumb
    //Section react-router V6
    //This code is for breadcrumb navigation
    //Start code
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        return {
            key: url,
            title: <NavLink to={url}>{breadcrumbNameMap[url]}</NavLink>,
        }
    })

    const breadcrumbItems = [
        {
            title: (
                <NavLink to="/">
                    <HomeOutlined />
                </NavLink>
            ),
            key: '/',
        },
    ].concat(extraBreadcrumbItems)
    //End code

    return (
        <>
            <StyledLayout>
                <AppAsideMenu
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Layout>
                    <AppHeader collapsed={collapsed} />
                    <Layout
                        style={{
                            padding: '0 24px  24px',
                            marginLeft: collapsed ? '80px' : '260px',
                            backgroundColor: '#F1F1F1',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '24px 24px',
                            }}
                            items={breadcrumbItems}
                        ></Breadcrumb>
                        <Content
                            style={{
                                padding: '0 24px 24px 24px',
                                margin: 0,
                                minHeight: 280,
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
