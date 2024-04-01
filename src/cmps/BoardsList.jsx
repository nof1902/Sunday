
import { BoardPreview } from "./BoardPreview.jsx";
import { useOutletContext } from "react-router-dom";

export function BoardsList({boards}) {
  
  return (
    <section className="boards-list">
      <section className="boards-list-header">
        <h4>Welcome Sapir!</h4>
        <h4>Quickly access your boards</h4>
        <img src="./Images/header-background-v2"></img>
      </section>
      <section className="board-of-boards">
        <ul className="boards">
            {boards.map(board => ( <BoardPreview key={board._id} board={board}/>
            ))}
        </ul>
      </section>
    </section>
  )
}

