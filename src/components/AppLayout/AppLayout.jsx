import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useSignOut } from 'react-auth-kit'

export const AppLayout = () => {
    const signOut = useSignOut()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        navigate('/')
        setTimeout(() => {
            signOut()
        }, 1000)

        return null
    }

    // const logOut = () => {
    //     signOut()
    //     navigate('/login')
    // }

    return (
        <>
            <div>AppLayout</div>
            <Button onClick={handleLogOut}>Sign Out</Button>

            <Outlet />
        </>
    )
}
