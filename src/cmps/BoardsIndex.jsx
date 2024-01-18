
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoards} from "../store/board.actions.js";
import { BoardPreview } from "./BoardPreview.jsx";

// render all boards
export function BoardsIndex() {
  
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])

  console.log(boards)

  return (
      <ul className="boards-list">
          {boards.map(board => (
            <li key={board._id}>
              <BoardPreview  board={board}/>
            </li>
          ))}
      </ul>
  )
}

