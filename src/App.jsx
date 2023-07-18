import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { RoutesComponent } from './routes/Routes'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
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
                    <RoutesComponent />
                </ThemeProvider>
            </ConfigProvider>
        </AuthProvider>
    )
}

export default App
