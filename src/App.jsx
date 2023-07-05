import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { RoutesComponent } from './routes/Routes'
import { ConfigProvider } from 'antd'

function App() {
    return (
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
        >
            <ConfigProvider>
                <RoutesComponent />
            </ConfigProvider>
        </AuthProvider>
    )
}

export default App
