import { useAuthUser } from 'react-auth-kit'
import { Typography, Space, Card, Avatar, Divider } from 'antd'
import {
    GithubOutlined,
    MailOutlined,
    LinkedinOutlined,
    UserOutlined,
} from '@ant-design/icons'
import nfzlogo from '@assets/nfzlogo.png'
import { Container, Logo } from './HomePage.styles'

export const HomePage = () => {
    const { Title, Paragraph, Link } = Typography
    const auth = useAuthUser()
    const firstName = auth().user_display_name?.split(' ')[0]
    const { Meta } = Card

    return (
        <Container>
            <div style={{ maxWidth: 900 }}>
                <div>
                    <Title level={1}>{`Witaj, ${
                        firstName || 'użytkowniku'
                    }!`}</Title>
                    <Paragraph>
                        Cieszymy się, że jesteś z nami 😍, mamy nadzieję, że
                        korzystanie z tej aplikacji przyśpieszy wykonywanie
                        zadań dotyczących udostępniania danych osobowych.
                    </Paragraph>
                    <Title level={4}>O udo</Title>
                    <Paragraph>
                        Aplikacja UDO powstała, aby jak najbardziej pomóc
                        sprostać rosnącym wymaganiom stawianianym naszym
                        dzielnym pracownikom. UDO automatyzuje większość
                        czynności podczas tworzenia odpowiedzi do wnioskodawcy.
                        Już nie musisz ręcznie przepisywać danych wpływu z EZD,
                        teraz wystarczy, że wpiszesz numer koszulki i klikniesz
                        przycisk pobierania danych. Po tej operacji wszystkie
                        dane pobiorą się automatycznie z EZD. Oczywiście to nie
                        jedyna super funkcja tej aplikacji!
                    </Paragraph>

                    <Title level={3}>
                        Masz pytanie, problem lub pomysł na dodanie nowości?
                    </Title>
                    <Paragraph>
                        Napisz do nas mejla! Chętnie pomożemy!
                    </Paragraph>
                    <Space size={'middle'}>
                        <Avatar shape="square" icon={<MailOutlined />} />
                        <Link
                            href="mailto:aplikacje@nfz-lublin.pl"
                            target="_blank"
                        >
                            aplikacje@nfz-lublin.pl
                        </Link>
                    </Space>
                </div>
                <Divider />
                <Title level={3}>Strona powstała we współpracy z:</Title>
                <Logo src={nfzlogo} />
                <Space wrap size={'large'}>
                    <Card
                        style={{
                            width: 300,
                            marginTop: 16,
                        }}
                        actions={[
                            <GithubOutlined key="github" />,
                            <LinkedinOutlined key="linkedin" />,
                            <a
                                key="email"
                                href="mailto:lukasz.bondyra@nfz-lublin.pl"
                            >
                                <MailOutlined />
                            </a>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title="Łukasz Bondyra"
                            description="Backend developer"
                        />
                    </Card>
                    <Card
                        style={{
                            width: 300,
                            marginTop: 16,
                        }}
                        actions={[
                            <a key="github" href="https://github.com/asgeev">
                                <GithubOutlined />
                            </a>,
                            <a
                                key="linkedin"
                                href="https://www.linkedin.com/in/szymanski-adam/"
                            >
                                <LinkedinOutlined />
                            </a>,
                            <a key="email" href="mailto:asgeev@proton.me">
                                <MailOutlined />
                            </a>,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://avatars.githubusercontent.com/u/80470876?v=4" />
                            }
                            title="Adam Szymański"
                            description="Frontend developer | Designer"
                        />
                    </Card>
                </Space>
            </div>
        </Container>
    )
}
