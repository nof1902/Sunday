import {NavLink } from 'react-router-dom'
import routes from '../routes'

export function SideNav() {

    return (
        <nav>
            {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
        </nav>
    )
}