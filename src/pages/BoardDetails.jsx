import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";
import {
  RemoveGroup,
  RemoveTask,
  SaveGroup,
  SaveTask,
  getEmptyGroup,
} from "../store/actions/board.actions.js";

export function BoardDetails() {
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const [board, setBoard] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadBoard();
  }, [params.id, boards]);

  async function loadBoard() {
    try {
      const currBoard = boards.find((b) => b._id === params.id);
      setBoard(currBoard);
    } catch (error) {
      showErrorMsg("Could Not Loading Board");
      console.log("error:", error);
    }
  }

  async function onSaveGroup(boardId, index, group, activity) {
    try {
      SaveGroup(boardId, index, group, activity);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      RemoveGroup(params.id, groupId);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateGroup(boardId, group, activity) {
    try {
      // let updatedGroup;
      // SaveGroup(boardId, null, group, activity).then(
      //   updatedGroup = board.groups.filter(theGroup => theGroup.id === group.id)
      // )
      // showSuccessMsg(`Task added successfully`);
      // console.log('updatedGroup',updatedGroup)
      // return updatedGroup;
      
      SaveGroup(boardId, null, group, activity)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onSaveTask(boardId, groupId, task, activity = {}) {
    try {
      let board = await SaveTask(boardId, groupId, task, activity)
      showSuccessMsg(`Task added successfully`)
      return board
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveTask(groupId, taskId) {
    try {
      RemoveTask(params.id, groupId, taskId);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  if (!board) return <div>Loading...</div>;
  const { groups } = board;

  // console.log("board", board);
  // console.log("groups", groups);

  return (
    <section className="board-details">
      <BoardIndexHeader
        board={board}
        onSaveTask={onSaveTask}
        onSaveGroup={onSaveGroup}
      />
      <GroupList
        groups={groups}
        onSaveTask={onSaveTask}
        onRemoveTask={onRemoveTask}
        onRemoveGroup={onRemoveGroup}
        onUpdateGroup={onUpdateGroup}
      />
      <button
        className="new-group-btn"
        onClick={() =>
          onSaveGroup(board._id, board.groups.length, getEmptyGroup(), {})
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          fill="#323338"
          width="24"
        >
          <path d="M11.3 18.6v-5.9H5.4v-1.4h5.9V5.4h1.4v5.9h5.9v1.4h-5.9v5.9Z"></path>
        </svg>
        Add new group
      </button>
    </section>
  );
}
