import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../routes"
import LayOut from "./LayOut"
import { useProfileState } from "../store/useProfileState"

function AppRouter() {
    const role = useProfileState(state => state.role)

    return(
        <Routes>
            <Route path="/" element={<LayOut />}>
                {routes.map(({path, element}) => {
                    if (!role && path === '/profile') {
                        return <Route key={path} path={path} element={<Navigate to='/login' replace />} />
                    } else if (role && path === '/login') {
                        return <Route key={path} path={path} element={<Navigate to='/profile' replace />} />
                    }
                    return <Route key={path} path={path} element={element} />
                })}
            </Route>
        </Routes>
    )
}

export default AppRouter