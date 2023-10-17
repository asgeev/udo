import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import { Routes } from '@templates/Routes/Routes'
import { theme } from './theme/theme'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    )
}

export default App
