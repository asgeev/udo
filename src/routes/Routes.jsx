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
import { Dodawanie } from './Dodawanie/Dodawanie'

//Walkaround for update a component while rendering a different component error <PrivateRoute>
//https://github.com/react-auth-kit/react-auth-kit/issues/1193
const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated()
    const auth = isAuthenticated()
    return auth ? <Component /> : <Navigate to="/login" />
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="login" element={<Login />} />

            <Route
                path="/"
                element={<PrivateRoute Component={AppLayout}></PrivateRoute>}
            >
                <Route index element={<Home />} />
                <Route exact path="dodawanie" element={<Dodawanie />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </>
    )
)

export const RoutesComponent = () => {
    return <RouterProvider router={router} />
}
