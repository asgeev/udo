import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
} from 'react-router-dom'
import { AppLayout } from '../components/AppLayout/AppLayout'
import { Login } from './Login/Login'
import { PageNotFound } from './PageNotFound/PageNotFound'
import { useIsAuthenticated } from 'react-auth-kit'
import { Home } from './Home/Home'
import { MainAdd } from './MainAdd/MainAdd'
import { RecordsView } from './RecordsView/recordsView'

//Walkaround for update a component while rendering a different component error <PrivateRoute>
//https://github.com/react-auth-kit/react-auth-kit/issues/1193
const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated()
    const auth = isAuthenticated()
    return auth ? <Component /> : <Navigate to="/login" />
}

export const RoutesComponent = () => {
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
                    <Route index element={<Home />} />
                    <Route path="dodawanie" element={<MainAdd />} />
                    <Route path="podglad" element={<RecordsView />} />
                    <Route path="podglad/:id" element={<RecordsView />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </>
        )
    )
    return <RouterProvider router={router} />
}
