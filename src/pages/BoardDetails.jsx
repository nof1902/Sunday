import { useEffect, useState } from "react";
// import { getBoardById, addBoard, removeBoard } from "../store/board.actions.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";
import { RemoveTask, SaveTask } from "../store/board.actions.js";

export function BoardDetails() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const params = useParams()
  const [board, setBoard] = useState(null)

  useEffect(() => {
    loadBoard()
  }, [params.id] )

  async function loadBoard() {
    try{
    const currBoard = boards.find(b => b._id === params.id);
    setBoard(currBoard);
    } catch (error) {
      showErrorMsg("Could Not Loading Board");
      console.log("error:", error);
    }
  }

  async function onSaveTask(boardId, groupId, task, activity) {
    try {
      SaveTask(boardId, groupId, task, activity)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showSuccessMsg(`Could not add task`)
      console.log('error',err)
    }
  }

  async function onRemoveTask(boardId, groupId, task, activity) {
    try {
      RemoveTask(boardId, groupId, task, activity)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showSuccessMsg(`Could not add task`)
      console.log('error',err)
    }
  }

  if (!board) return <div>Loading...</div>
  const { groups } = board

  // console.log("board", board);
  // console.log("groups", groups);

  return (
    <section className="board-details">
      <BoardIndexHeader board={board} onSaveTask={onSaveTask} />
      <GroupList groups={groups} onSaveTask={onSaveTask} />
      <button className="new-group-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#323338" width="24"><path d="M11.3 18.6v-5.9H5.4v-1.4h5.9V5.4h1.4v5.9h5.9v1.4h-5.9v5.9Z"></path></svg>
        Add new group
      </button>
      
    </section>
  );
}
