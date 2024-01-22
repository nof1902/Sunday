import { useEffect, useState } from "react";
import { getBoardById, addBoard, removeBoard } from "../store/board.actions.js";
import { useParams } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";

export function BoardDetails() {
  const params = useParams();
  const [board, setBoard] = useState(null);

  console.log("params", params);

  useEffect(() => {
    loadBoard();
  }, [params.id]);

  async function loadBoard() {
    const boardData = await getBoardById(params.id);
    setBoard(boardData);
  }

  console.log("board", board);

  if (!board) return <div>Loading...</div>;

  return (
    <section className="board-details">
      <BoardIndexHeader board={board} />
      <GroupList groups={board.groups} />
    </section>
  );
}
