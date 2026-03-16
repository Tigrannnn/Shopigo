import { Navigate, Route, Routes } from "react-router-dom"
import { adminRoutes, routes } from "./routes"
import Layout from "./Layout/Layout"
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../utils/constants/routes"
import { useAuthQuery } from "@/hooks/query/useUsersQuery"

function AppRouter() {
    // Get user data from global state
    const { data: user } = useAuthQuery()

    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                {user && user.role === 'ADMIN' && adminRoutes.map(({path, element}) => {
                    return <Route key={path} path={path} element={element} />
                })}
                {routes.map(({path, element}) => {
                    if (!user && path === PROFILE_ROUTE) {
                        return <Route key={path} path={path} element={<Navigate to={LOGIN_ROUTE} replace={true}/>} />
                    } else if (user && path === LOGIN_ROUTE) {
                        return <Route key={path} path={path} element={<Navigate to={PROFILE_ROUTE} replace={true}/>} />
                    }
                    return <Route key={path} path={path} element={element} />
                })}
            </Route>
        </Routes>
    )
}

export default AppRouter