import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
//Import pages
import { AppLayout } from '@templates/AppLayout/AppLayout'
import { Login } from '@pages/Login/Login'
import { PageNotFound } from '@pages/PageNotFound/PageNotFound'
import { HomePage } from '@pages/HomePage/HomePage'
import { MainAdd } from '@pages/MainAdd/MainAdd'
import { RecordsView } from '@pages/RecordsView/RecordsView'

//Walkaround for update a component while rendering a different component error <PrivateRoute>
//https://github.com/react-auth-kit/react-auth-kit/issues/1193
const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated()
    const auth = isAuthenticated()
    return auth ? <Component /> : <Navigate to="/login" />
}

export const Routes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute Component={AppLayout}></PrivateRoute>
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="dodawanie" element={<MainAdd />} />
                    <Route path="podglad" element={<RecordsView />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </>
        )
    )
    return <RouterProvider router={router} />
}
