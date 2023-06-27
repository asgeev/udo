import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useSignOut } from 'react-auth-kit'

export const AppLayout = () => {
    const signOut = useSignOut()
    const navigate = useNavigate()

    const logOut = () => {
        signOut()
        navigate('/login')
    }

    return (
        <>
            <div>AppLayout</div>
            <Button onClick={logOut}>Sign Out</Button>

            <Outlet />
        </>
    )
}
