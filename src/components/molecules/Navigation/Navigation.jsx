import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Typography, Tag } from 'antd'
import {
    PlusOutlined,
    HomeOutlined,
    RiseOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import logoUDO from '@assets/LogoUDO.png'
import { LogoContainer } from './Navigation.styles'

//Construction of menu items in array
//{ key, icon, children, label, disabled, type}
//key must be preceded by slash because coresponding to routes path
const menuItems = [
    {
        key: '/',
        label: 'Główna',
        icon: <HomeOutlined />,
    },
    {
        key: '/dodawanie',
        icon: <PlusOutlined />,
        label: 'Dodawanie',
    },
    {
        key: '/podglad',
        icon: <SearchOutlined />,
        label: 'Podgląd',
    },
    {
        key: '/statystyka',
        icon: <RiseOutlined />,
        label: 'Statystyka',
        disabled: true,
    },
]

export const Navigation = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [current, setCurrent] = useState(location.pathname)
    const { Sider } = Layout
    const { Text } = Typography

    const navigateTo = (e) => {
        setCurrent(e.key)
        navigate(e.key)
    }

    useEffect(() => {
        setCurrent(location.pathname)
    }, [location.pathname])

    return (
        <Sider
            width={260}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                height: '100vh',
                position: 'fixed',
            }}
        >
            <LogoContainer>
                <a href="/">
                    <img src={logoUDO} />
                </a>
                {!collapsed && (
                    <>
                        <Text
                            type="secondary"
                            style={{
                                color: 'white',
                                fontSize: '1.8rem',
                                fontFamily: 'Lexend Peta, sans-serif',
                                transition: 'visible 2s ease-in-out',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            UDO
                        </Text>
                        <Tag color="blue">
                            <strong>BETA</strong>
                        </Tag>
                    </>
                )}
            </LogoContainer>
            <Menu
                mode="inline"
                onClick={navigateTo}
                selectedKeys={[current]}
                theme="dark"
                style={{
                    padding: '10px',
                    height: '100%',
                }}
                items={menuItems}
            />
        </Sider>
    )
}
