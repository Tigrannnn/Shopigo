import { useEffect } from "react"
import { Link } from "react-router-dom"
import { SHOP_ROUTE } from "../utils/consts"

function NotFound() {
    useEffect(() => {
        document.title = 'Page not found'
    }, [])

    return(
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link to={SHOP_ROUTE}>Go to main page</Link>
        </div>
    )
}

export default NotFound