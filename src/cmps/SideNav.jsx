
// import routes from '../routes'
import { NavLink, useParams } from "react-router-dom"

export function SideNav({ boards }) {

    // const params = useParams()
    return (
        <nav>
            {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}
            <NavLink to={`/boards`}>Home</NavLink>
            {boards.map(board => <NavLink key={board._id} to={`/boards/${board._id}`}>{board.title}</NavLink>)}
        </nav>
    )
}