import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import { Button, Typography, Form, Input, message, Divider } from 'antd'
import axios from 'axios'
import logo from '../../assets/LogoUDO.png'
import { GithubOutlined, AntDesignOutlined } from '@ant-design/icons'
import {
    LoginContainer,
    LogoImg,
    LeftPanel,
    RightPanel,
    FormContainer,
    TextContainer,
    ExternalLinks,
} from './Login.styles'

export const Login = () => {
    const { Title, Text } = Typography
    const signIn = useSignIn()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)
    const isAuthenticated = useIsAuthenticated()
    const auth = isAuthenticated()

    useEffect(() => {
        if (auth) {
            return navigate('/')
        }
    }, [auth, navigate])

    const logIn = (res) => {
        if (
            signIn({
                token: res.data.token,
                tokenType: 'Bearer',
                expiresIn: 8,
                authState: res.data,
            })
        ) {
            navigate('/')
        } else {
            messageApi.error(
                'Ups! Wystąpił błąd logowania, spróbuj ponownie później!'
            )
        }
    }

    const onSubmit = (values) => {
        setLoading(true)

        axios
            .post(`${import.meta.env.VITE_WP_URL}/jwt-auth/v1/token`, values, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.status === 200) {
                    logIn(res)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
                if (error.response.status === 403) {
                    messageApi.error(
                        'Nieprawidłowy login lub hasło. Spróbuj ponownie.',
                        8
                    )
                } else {
                    messageApi.error(
                        'Ups! Wystąpił błąd logowania, spróbuj ponownie później!',
                        8
                    )
                }
            })
    }

    const onSubmitError = (errorInfo) => {
        if (!errorInfo?.values?.username || !errorInfo?.values?.password) {
            messageApi.warning('Podaj nazwę użytkownika i hasło')
        }
    }

    return (
        <>
            {contextHolder}

            <LoginContainer>
                <LeftPanel></LeftPanel>

                <RightPanel>
                    <FormContainer>
                        <LogoImg src={logo} />
                        <TextContainer>
                            <Title level={2}>Witaj ponownie!</Title>
                            <Text type="secondary">
                                Zaloguj się domenowo aby korzystać z aplikacji.
                            </Text>
                        </TextContainer>
                        <Form
                            name="loginForm"
                            layout="vertical"
                            style={{
                                minWidth: 400,
                                maxWidth: 600,
                            }}
                            onFinish={onSubmit}
                            onFinishFailed={onSubmitError}
                            autoComplete="on"
                        >
                            <Form.Item
                                label="Nazwa użytkownika lub E-mail"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Proszę wprowadzić login!',
                                        autocomplete: 'on',
                                    },
                                ]}
                            >
                                <Input placeholder="" />
                            </Form.Item>

                            <Form.Item
                                label="Hasło"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Proszę wprowadzić hasło!',
                                        autocomplete: 'on',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    block
                                >
                                    Zaloguj
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider plain>
                            <Text type="secondary">OR</Text>
                        </Divider>
                        <ExternalLinks>
                            <a href="https://github.com/polishghost27/udo">
                                <GithubOutlined />
                            </a>
                            <a href="https://ant.design/">
                                <AntDesignOutlined />
                            </a>
                        </ExternalLinks>
                    </FormContainer>
                </RightPanel>
            </LoginContainer>
        </>
    )
}
