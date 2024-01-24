import { useEffect, useState } from "react";
import { getBoardById, addBoard, removeBoard } from "../store/board.actions.js";
import { useParams } from "react-router-dom";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";

export function BoardDetails({boards}) {
  const params = useParams();
  const [board, setBoard] = useState(null);

  // console.log("params", params);

  useEffect(() => {
    loadBoard();
  }, [params.id]);

  async function loadBoard() {
    const boardData = await getBoardById(params.id);
    setBoard(boardData);
  }

  if (!board) return <div>Loading...</div>;
  const { groups } = board
  // console.log("board", board);
  // console.log("groups", groups);
  return (
    <section className="board-details">
      <BoardIndexHeader board={board} />
      <GroupList groups={groups} />
    </section>
  );
}
