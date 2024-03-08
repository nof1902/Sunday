import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";
import {
  RemoveGroup,
  RemoveTask,
  SaveGroup,
  SaveTask,
  getBoardById,
  getEmptyGroup,
  updateBoard,
} from "../store/actions/board.actions.js";

export function BoardDetails() {
  const currBoard = useSelector((storeState) => storeState.boardModule.currBoard);
  const params = useParams();

  useEffect(() => {
    loadBoard()
  }, [params.id]);

  async function loadBoard(){
    try{
      await getBoardById(params.id)
    } catch (err){
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onSaveGroup(index, group, activity) {
    try {
      await SaveGroup(currBoard._id, index, group, activity);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      await RemoveGroup(currBoard._id, groupId);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateGroup(group, activity) {
    try {
      await SaveGroup(currBoard._id, null, group, activity)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onSaveTask(groupId, task, activity = {}) {
    try {
      await SaveTask(currBoard._id, groupId, task, activity)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveTask(groupId, taskId) {
    try {
      await RemoveTask(currBoard._id, groupId, taskId);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateBoard(updatedBoard) {
    try{
      await updateBoard(updatedBoard)
      showSuccessMsg(`Board update successfully`);
      console.log(currBoard.title)
    } catch (err){
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
    
  }

  if (!currBoard) return <div>Loading...</div>;
  const { groups , cmpsOrder } = currBoard;

  return (
    <section className="board-details">
      <BoardIndexHeader
        board={currBoard}
        onSaveTask={onSaveTask}
        onSaveGroup={onSaveGroup}
        onUpdateBoard={onUpdateBoard}
        cmpsOrder={cmpsOrder}
      />
      <GroupList
        groups={groups}
        onSaveTask={onSaveTask}
        onRemoveTask={onRemoveTask}
        onRemoveGroup={onRemoveGroup}
        onUpdateGroup={onUpdateGroup}
        cmpsOrder={cmpsOrder}
      />
      <button
        className="new-group-btn"
        onClick={() =>
          onSaveGroup(currBoard.groups.length, getEmptyGroup(), {})
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
