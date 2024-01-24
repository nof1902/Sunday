
// import routes from '../routes'
import { NavLink, useParams } from "react-router-dom"
import { svgService } from "../svg.service"

export function SideNav({ boards }) {

    const homeIcon = svgService.getSvg('home')
    const homeIconUrl = `data:image/svg+xml,${encodeURIComponent(homeIcon)}`

    const boardIcon = svgService.getSvg('clipboard')
    const boardIconUrl = `data:image/svg+xml,${encodeURIComponent(boardIcon)}`

    const searchIcon = svgService.getSvg ('search')
    const searchIconUrl = `data:image/svg+xml,${encodeURIComponent(searchIcon)}`

    // const params = useParams()
    return (
        <nav className="side-navigation">
            {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}
            <div className="sidenav-home">
                 <img src={homeIconUrl} />
                 <NavLink to={`/boards`}>Home</NavLink>
            </div>
            
            <div className="sidenav-search">
                <input type="text" placeholder="Search"></input>
                <img src={searchIconUrl} />
            </div>
                
                {boards.map(board =>  (
                        <div className="sidenav-home" key={board._id}>
                            <img src={boardIconUrl} />
                            <NavLink key={board._id} to={`/boards/${board._id}`}>{board.title}    </NavLink>
                        </div>
                        ))}
        </nav>
    )
}