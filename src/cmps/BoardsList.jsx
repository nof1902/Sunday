import { BoardPreview } from "./BoardPreview.jsx";
import { useOutletContext } from "react-router-dom";

export function BoardsList({ isLoading, boards }) {
  return (
    // <>
    //   {boards ? {<ul className="boards-list">
    //   {boards.map(board => ( <BoardPreview key={board._id} board={board}/>
    //   ))}</ul>}:
    //   <div className="isLoading"><img src={"./Images/loading.gif"} alt="loading..."/></div>}
    // </>

    <>
      {boards ? (
        <ul className="boards-list">
          {boards.map((board) => (
            <BoardPreview key={board._id} board={board} />
          ))}
        </ul>
      ) : (
        <div className="isLoading">
          <img src="./Images/loading.gif" alt="loading..." />
        </div>
      )}
    </>
  );
}
