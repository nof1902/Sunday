
import routes from '../routes'
import { useParams, NavLink} from "react-router-dom"

export function SideNav() {

    return (
        <nav>
            {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
        </nav>
    )
}