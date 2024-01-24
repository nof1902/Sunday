import { useEffect, useState } from "react";
import { getBoardById, addBoard, removeBoard } from "../store/board.actions.js";
import { useParams,useOutletContext } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";

export function BoardDetails() {
  const params = useParams();
  const [board, setBoard] = useState(null);
  const { onSaveTask } = useOutletContext()
  const { boards } = useOutletContext()

  useEffect(() => {
    loadBoard()
  }, [params.id,boards] )

  async function loadBoard() {
    try{
    const currBoard = boards.find(b => b._id === params.id);
    setBoard(currBoard);
    } catch (error) {
      showErrorMsg("Could Not Loading Board");
      console.log("error:", error);
    }
  }

  if (!board) return <div>Loading...</div>;
  const { groups } = board
  // console.log("board", board);
  // console.log("groups", groups);

  // console.log('num of tasks from BoardDetails', board.groups[0].tasks.length)



  // console.log('num of tasks', boards[1].groups[0].tasks.length)
  return (
    <section className="board-details">
      <BoardIndexHeader board={board} onSaveTask={onSaveTask} />
      <GroupList groups={groups} onSaveTask={onSaveTask}/>
    </section>
  );
}
