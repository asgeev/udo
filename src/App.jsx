import 'antd/dist/reset.css'
import { AuthProvider } from 'react-auth-kit'
import { RoutesComponent } from './routes/Routes'
import { ConfigProvider } from 'antd'

function App() {
    return (
        <>
            <ConfigProvider>
                <AuthProvider authType={'cookie'} authName={'_auth'}>
                    <RoutesComponent />
                </AuthProvider>
            </ConfigProvider>
        </>
    )
}

export default App
