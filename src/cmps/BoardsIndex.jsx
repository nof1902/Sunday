
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards} from "../store/board.actions.js";

// render all boards
export function BoardsIndex() {
  
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])

  return (
    <section className="boards-index">
        <ul className="boards-list">
            {boards.map(board => (
                <BoardPreview board={board}
                                key={board.id}
                                onToggleStar={onToggleStar}/>
            ))}
        </ul>

    </section>
  )
}

