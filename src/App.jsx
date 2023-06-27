import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { RoutesComponent } from './routes/Routes'

function App() {
    return (
        <>
            <AuthProvider
                authType={'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === 'https:'}
            >
                <RoutesComponent />
            </AuthProvider>
        </>
    )
}

export default App
