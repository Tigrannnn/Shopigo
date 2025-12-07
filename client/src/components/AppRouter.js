import { Navigate, Route, Routes } from "react-router-dom"
import { adminRoutes, routes } from "../routes"
import LayOut from "./LayOut"
import { useProfileState } from "../store/useProfileState"
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../utils/consts"

function AppRouter() {
    const role = useProfileState(state => state.role)

    return(
        <Routes>
            <Route path="/" element={<LayOut />}>
                {role === 'ADMIN' && adminRoutes.map(({path, element}) => {
                    return <Route key={path} path={path} element={element} />
                })}
                {routes.map(({path, element}) => {
                    if (!role && path === PROFILE_ROUTE) {
                        return <Route key={path} path={path} element={<Navigate to={LOGIN_ROUTE} />} />
                    } else if (role && path === LOGIN_ROUTE) {
                        return <Route key={path} path={path} element={<Navigate to={PROFILE_ROUTE} />} />
                    }
                    return <Route key={path} path={path} element={element} />
                })}
            </Route>
        </Routes>
    )
}

export default AppRouter