import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import { Routes } from '@templates/Routes/Routes'
import { theme } from './theme/theme'

function App() {
    return (
        <AuthProvider
            authType={'localstorage'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
        >
            <ConfigProvider>
                <ThemeProvider theme={theme}>
                    <Routes />
                </ThemeProvider>
            </ConfigProvider>
        </AuthProvider>
    )
}

export default App
