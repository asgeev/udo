import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import styled from 'styled-components'
import { Button, Typography, Form, Input, message } from 'antd'
import axios from 'axios'

export const CenterContainer = styled.div`
    width: 100vw;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Login = () => {
    const { Title } = Typography
    const signIn = useSignIn()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState([false])

    const logIn = (res) => {
        setLoading(true)
        if (
            signIn({
                token: res.data.token,
                tokenType: 'Bearer',
                expiresIn: 3600,
                authState: res.data.user_email,
            })
        ) {
            setLoading(false)
            navigate('/')
            // Only if you are using refreshToken feature
        } else {
            messageApi.error('afsasffsa')
        }
    }

    const onSubmit = (values) => {
        axios
            .post(`http://localhost:8080/wp-json/jwt-auth/v1/token`, values)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    logIn(res)
                }
            })
            .catch((error) => {
                console.error(error)
                messageApi.error(error.message)
            })
    }

    const onSubmitError = (errorInfo) => {
        console.log('Failed:', errorInfo)
        console.log(errorInfo.values.username)
        if (!errorInfo?.values?.username || !errorInfo?.values?.password) {
            messageApi.info('Podaj nazwę użytkownika i hasło')
        }
    }

    return (
        <>
            {contextHolder}
            <CenterContainer>
                <Title level={1}>Witaj w aplikacji UDO</Title>
                <Form
                    name="loginForm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitError}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Login"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Proszę wprowadzić login!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Hasło"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Proszę wprowadzić hasło!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </CenterContainer>
        </>
    )
}
