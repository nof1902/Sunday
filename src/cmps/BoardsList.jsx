
import { BoardPreview } from "./BoardPreview.jsx";

// render all boards
export function BoardsList({boards}) {

  // useEffect(() => {
  //   loadBoards()
  // }, [])

  return (
      <ul className="boards-list">
          {boards.map(board => ( <BoardPreview key={board._id} board={board}/>
          ))}
      </ul>
  )
}

