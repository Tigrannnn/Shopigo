import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../routes"
import LayOut from "./LayOut"
import { useProfileState } from "../store/useProfileState"

function AppRouter() {
    const user = useProfileState(state => state.user)

    return(
        <Routes>
            <Route path="/" element={<LayOut />}>
                {routes.map(({path, element}) => {
                    if (user === 'guest' && path === '/profile') {
                        return <Route key={path} path={path} element={<Navigate to='/login' replace />} />
                    } else if (user !== 'guest' && path === '/login') {
                        return <Route key={path} path={path} element={<Navigate to='/profile' replace />} />
                    }
                    return <Route key={path} path={path} element={element} />
                })}
            </Route>
        </Routes>
    )
}

export default AppRouter