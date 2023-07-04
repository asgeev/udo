import { Layout, Avatar, Space, Dropdown, Badge, theme } from 'antd'
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import {
    LogoutOutlined,
    UserOutlined,
    SettingOutlined,
    BellOutlined,
} from '@ant-design/icons'
import { Typography } from 'antd'

export const AppHeader = () => {
    const { Header } = Layout
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const username = auth() ? auth()?.user_display_name : 'Witaj, użytkowniku'
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
                marginLeft: 260,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                background: colorBgContainer,
            }}
        >
            <Space size={16}>
                <Space size={'small'}>
                    <Badge count={0}>
                        <BellOutlined
                            style={{
                                fontSize: '1.4rem',
                            }}
                        />
                    </Badge>
                </Space>
                <Text>{username}</Text>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <Avatar
                        style={{
                            backgroundColor: '#1677ff',
                        }}
                        icon={<UserOutlined />}
                    />
                </Dropdown>
            </Space>
        </Header>
    )
}
