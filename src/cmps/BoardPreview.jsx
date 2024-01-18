
import { Link} from "react-router-dom"

export function BoardPreview( { board } ) {

    return (
        <section className="board-link">
            <Link to={`sunday2023/board/${board.id}`}> 
                <h1 className="board-title">{board.title}</h1>
                <h1 className="board-num-of-groups">{board.groups.length} Groups</h1>
            </Link>
        </section>
    )
}