import { useAuthUser } from 'react-auth-kit'
import styled from 'styled-components'
import { Typography, Anchor, Space, Card, Avatar, Divider } from 'antd'
import {
    GithubOutlined,
    MailOutlined,
    LinkedinOutlined,
    UserOutlined,
} from '@ant-design/icons'
import nfzlogo from '@assets/nfzlogo.png'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`

const AnchorStyled = styled(Anchor)`
    /* position: sticky; */
`
const GuideItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const GuideItemContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
`

const Logo = styled.img`
    margin: 20px 0;
    width: 400px;
`

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
                        jedyna super funkcja w tej aplikacji. Więcej odkryjesz w
                        przygotowanym tutorialu który dołączony jest do ważnych
                        elementów strony.
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
                <Title level={3}>Aplikacja powstała we współpracy z:</Title>
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
                            <a
                                key="github"
                                href="https://github.com/polishghost27"
                            >
                                <GithubOutlined />
                            </a>,
                            <a
                                key="linkedin"
                                href="https://www.linkedin.com/in/szymanski-adam/"
                            >
                                <LinkedinOutlined />
                            </a>,
                            <a
                                key="email"
                                href="mailto:adamszymanski27@hotmail.com"
                            >
                                <MailOutlined />
                            </a>,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://avatars.githubusercontent.com/u/80470876?v=4" />
                            }
                            title="Adam Szymański"
                            description="Frontend developer | Desinger"
                        />
                    </Card>
                </Space>

                {/* <Row gutter={[20, 0]}>
                    <Col xs-span={10} span={20}>
                        <GuideItemsContainer>
                            <GuideItemContainer id="logowanie">
                                <Title level={3}>Logowanie</Title>
                                <Paragraph>
                                    Do aplikacji możemy zalogować się domenowo
                                    czyli używając tych samych poświadczeń jak
                                    do naszego komputera. Wystarczy podać login
                                    lub adres email oraz wpisać hasło.
                                </Paragraph>
                            </GuideItemContainer>
                            <GuideItemContainer id="dodawanie-zapytania">
                                <Title level={3}>Dodawanie sprawy</Title>
                                <Paragraph>
                                    Klikając w menu przycisk [dodawanie]
                                    otworzyn nam się formularz który umożliwia
                                    zarejestrowanie zapytania które dostaliśmy
                                    do realizacji.
                                </Paragraph>
                                <Paragraph>
                                    Formularz podzielony jest na sekcje. Każda z
                                    sekcji odpowiada za przetrzymywanie
                                    określonych danych potrzebnych do
                                    zarejestrowania sprawy w aplikacji.
                                </Paragraph>
                                <Title level={5}>Dane wpływu</Title>
                                <Paragraph>
                                    Ta sekcja umożliwia nam wprowadzenie
                                    podstawowych danych dotyczących wpływu. Pola
                                    oznaczone <Text type="danger">*</Text> są
                                    wymagane.
                                </Paragraph>
                            </GuideItemContainer>
                        </GuideItemsContainer>
                    </Col>
                    <Col span={4}>
                        <AnchorStyled
                            replace
                            items={[
                                {
                                    key: 'logowanie',
                                    href: '#logowanie',
                                    title: 'logowanie',
                                },
                                {
                                    key: 'dodawanie-zapytania',
                                    href: '#dodawanie-zapytania',
                                    title: 'dodawanie',
                                },
                                {
                                    key: 'part-3',
                                    href: '#part-3',
                                    title: 'Part 3',
                                },
                                {
                                    key: 'part-4',
                                    href: '#part-4',
                                    title: 'Part 4',
                                },
                                {
                                    key: 'part-5',
                                    href: '#part-5',
                                    title: 'Part 5',
                                },
                            ]}
                        />
                    </Col>
                </Row> */}
            </div>
        </Container>
    )
}
