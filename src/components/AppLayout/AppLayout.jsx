import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSignOut } from 'react-auth-kit'
import logoUDO from '../../assets/LogoUDO.png'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { StyledLayout, LogoContainer } from './AppLayout.styled'

//Construction of menu items in array
//{ key, icon, children, label, disabled, type}
//key must be preceded by slash because the coresponding to routes path
const menuItems = [
    {
        key: '/',
        icon: null,
        children: null,
        label: 'Głowna',
    },
    {
        key: '/dodawanie',
        icon: null,
        children: null,
        label: 'Dodawanie',
    },
    {
        key: '/statystyka',
        icon: null,
        children: null,
        label: 'Statystyka',
    },
    {
        key: '/podgląd',
        icon: null,
        children: null,
        label: 'Podgląd',
    },
]

export const AppLayout = () => {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const location = useLocation()
    const { Header, Content, Sider } = Layout
    const [current, setCurrent] = useState(location.pathname)
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const navigateTo = (e) => {
        console.log('click ', e)
        setCurrent(e.key)
        navigate(e.key)
    }

    const handleSignOut = async () => {
        setTimeout(() => {
            navigate('/login')
            signOut()
        }, 600)
    }

    return (
        <>
            <StyledLayout>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <LogoContainer>
                        <a href="/">
                            <img src={logoUDO} />
                        </a>
                    </LogoContainer>
                </Header>
                <Layout>
                    <Sider
                        width={260}
                        style={{
                            background: colorBgContainer,
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: '64px',
                            bottom: 0,
                        }}
                    >
                        <Menu
                            mode="inline"
                            onClick={navigateTo}
                            selectedKeys={[current]}
                            theme="dark"
                            style={{
                                height: '100%',
                                borderRight: 1,
                            }}
                            items={menuItems}
                        />
                    </Sider>
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
                            <Outlet
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                            <button onClick={handleSignOut}>Sign Out</button>
                        </Content>
                    </Layout>
                </Layout>
            </StyledLayout>
        </>
    )
}

/* <div ref={ref}>AppLayout</div>
            <Button ref={ref} onClick={handleLogOut}>
                Sign Out
            </Button> */

// const handleLogOut = async () => {
//     navigate('/')
//     setTimeout(() => {
//         signOut()
//     }, 1000)

//     return null
// }

// const handleLogOut = () => {
//     signOut()
//     navigate('/login')
// }
