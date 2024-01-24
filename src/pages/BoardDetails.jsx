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

  useEffect(() => {
    loadBoard()
  }, [params.id])

  async function loadBoard() {
    try{
      const board = await getBoardById(params.id)
      setBoard(board) 
    } catch (error) {
      showErrorMsg("Could Not Loading Board");
      console.log("error:", error);
    }
  }

  if (!board) return <div>Loading...</div>;
  const { groups } = board
  console.log("board", board);
  console.log("groups", groups);
  return (
    <section className="board-details">
      <BoardIndexHeader board={board} />
      <GroupList groups={groups} />
    </section>
  );
}
