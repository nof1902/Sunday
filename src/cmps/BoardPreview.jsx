
import { Link} from "react-router-dom"

export function BoardPreview( { board } ) {

    return (
        <li className="board-card">
            <Link to={`sunday2023/board/${board.id}`}>
                <img className='card-image' src="https://cdn.monday.com/images/quick_search_recent_board.svg"></img> 
                <h1 className="board-title">{board.title}</h1>
                <h1 className="board-num-of-groups">{board.groups.length} Groups</h1>
            </Link>
        </li>
        
    )
}