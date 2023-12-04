import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { Layout, Avatar, Space, Dropdown, Badge, theme, Typography } from 'antd'

import {
    LogoutOutlined,
    UserOutlined,
    SettingOutlined,
    BellOutlined,
} from '@ant-design/icons'

export const Header = ({ collapsed }) => {
    const { Header } = Layout
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const username = auth() ? auth()?.user_display_name : 'użytkowniku'
    const { Text } = Typography

    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const handleSignOut = async () => {
        setTimeout(() => {
            navigate('/login')
            signOut()
        }, 600)
    }

    const items = [
        {
            label: <a href="/ustawienia">Ustawienia</a>,
            key: '/ustawienia',
            icon: <SettingOutlined />,
            disabled: true,
        },

        {
            type: 'divider',
        },
        {
            label: (
                <a onClick={handleSignOut} type="button">
                    Wyloguj się
                </a>
            ),
            key: '/logout',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ]

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                height: 74,
                marginLeft: collapsed ? '80px' : '260px',
                zIndex: 1,
                background: colorBgContainer,
                boxShadow: 'rgba(0, 0, 0, 0.09) 0px 3px 12px',
            }}
        >
            <Space
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                }}
            >
                <Space size={'middle'} align={'center'}>
                    <Badge count={0}>
                        <BellOutlined
                            style={{
                                fontSize: '1.4rem',
                            }}
                        />
                    </Badge>
                    <Text>{`Witaj, ${username}`}</Text>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <Avatar icon={<UserOutlined />} />
                    </Dropdown>
                </Space>
            </Space>
        </Header>
    )
}
