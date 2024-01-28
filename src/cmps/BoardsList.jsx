
import { BoardPreview } from "./BoardPreview.jsx";

export function BoardsList({boards}) {

  return (
      <ul className="boards-list">
          {boards.map(board => ( <BoardPreview key={board._id} board={board}/>
          ))}
      </ul>
  )
}

