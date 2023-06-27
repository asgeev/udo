import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    BrowserRouter,
    Routes,
} from 'react-router-dom'
import { AppLayout } from '../components/AppLayout/AppLayout'
import { Login } from './Login/Login'
import { PageNotFound } from './PageNotFound/PageNotFound'
import { RequireAuth } from 'react-auth-kit'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={
                    <RequireAuth loginPath={'/login'}>
                        <AppLayout />
                    </RequireAuth>
                }
            ></Route>
            <Route path="login" element={<Login />} />
            <Route path="*" exact element={<PageNotFound />} />
        </>
    )
)

export const RoutesComponent = () => {
    return <RouterProvider router={router} />
}
