import { boardService } from "../../services/board.service.local.js";
import { userService } from "../../services/user.service.js";
import { store } from "../store.js";
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../services/event-bus.service.js";

import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer.js";
import {
  REMOVE_BOARD,
  ADD_BOARD,
  UPDATE_BOARD,
  SET_BOARDS,
  UNDO_REMOVE_BOARD,
  CLEAN_CURR_BOARD,
  SET_BOARD
} from "../reducers/board.reducer.js";
import { utilService } from "../../services/util.service.js";

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  };
}
export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}
export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  };
}

export async function loadBoards() {
  try {
    // store.dispatch({ type: LOADING_START })
    const boards = await boardService.query();

    console.log("Boards from DB:", boards);
    store.dispatch({
      type: SET_BOARDS,
      boards
    });
  } catch (err) {
    console.log("Cannot load Boards", err);
    throw err;
  }
}

export async function getBoardById(boardId) {
  try {
    const board = await boardService.getById(boardId);
    store.dispatch({
      type: SET_BOARD,
      board,
    });
    return board
  } catch (err) {
    console.log("Cannot load Boards", err);
    throw err;
  }
}

export async function updateBoardFromBoards(boards, boardIdToUpdate) {
  try {
    console.log('boardIdToUpdate', boardIdToUpdate)
    let board = await boardService.getById(boardIdToUpdate._id);
    await boardService.save({...board, title: boardIdToUpdate.title});
    store.dispatch({
      type: SET_BOARDS,
      boards,
      board
    });
    
  } catch (err) {
    console.log("Cannot load Boards", err);
    throw err;
  }
}

export async function cleanCurrBoard(){
  try {
    store.dispatch({
      type: CLEAN_CURR_BOARD,
    });
  } catch (err) {
    console.log("Cannot load Boards", err);
    throw err;
  }
}


export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId);
    store.dispatch(getActionRemoveBoard(boardId));
  } catch (err) {
    console.log("Cannot remove Board", err);
    throw err;
  }
}

export async function addBoard(boardTitle) {
  try {
    const savedBoard = await boardService.createBoard(boardTitle);
    store.dispatch(getActionAddBoard(savedBoard));
    return savedBoard;
  } catch (err) {
    console.log("Cannot add Board", err);
    throw err;
  }
}

export async function updateBoardOptimistic(board) {
  try {
    store.dispatch(getActionUpdateBoard(board));
    const savedBoard = await boardService.updateBoard(board);
    return savedBoard;
  } catch (err) {
    console.log("Cannot update Board", err);
    throw err;
  }
}

export async function updateBoard(board) {
  try {
    const savedBoard = await boardService.updateBoard(board);
    store.dispatch(getActionUpdateBoard(savedBoard));
    return savedBoard;
  } catch (err) {
    console.log("Cannot update Board", err);
    throw err;
  }
}

// by adding task from headerindex - the task automaticly
export async function SaveTask(boardId, groupId, task, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.saveTask(board, groupId, task, activity);
  // updateBoard(board);
  return board
}

export async function RemoveTask(boardId, groupId, taskId, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.removeTask(board, groupId, taskId, activity);
  // updateBoard(board);
  return board
}

export async function SaveGroup(boardId, index, group, activity = {}) {
  console.log('SaveGroup' , group)
  let board = await boardService.getById(boardId);
  board = await boardService.saveGroup(board, index, group, activity);
  // updateBoard(board);
  return board
}

export async function RemoveGroup(boardId, groupId, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.removeGroup(board, groupId, activity);
  // updateBoard(board);
  return board
}

export async function SaveStatusPicker(boardId, statusPicker) {
  console.log('statusPicker' , statusPicker)
  let board = await boardService.getById(boardId);
  board = await boardService.saveStatusPicker(board, statusPicker);
  // updateBoard(board);
  return board
}




// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
  store.dispatch({
    type: REMOVE_BOARD,
    boardId,
  });
  showSuccessMsg("Board removed");

  boardService
    .remove(boardId)
    .then(() => {
      console.log("Server Reported - Deleted Successfully");
    })
    .catch((err) => {
      showErrorMsg("Cannot remove car");
      console.log("Cannot load cars", err);
      store.dispatch({
        type: UNDO_REMOVE_BOARD,
      });
    });
}

export async function checkout(total) {
  try {
    const score = await userService.changeScore(-total);
    store.dispatch({ type: SET_SCORE, score });
    store.dispatch({ type: CLEAR_BoardT });
    return score;
  } catch (err) {
    console.log("BoardActions: err in checkout", err);
    throw err;
  }
}

export function getEmptyTask() {
  return {
    id: "",
    title: "New Task",
    // people: "",
    // status: "Not Started",
    // priority: "",
    // timeline: '',
  };
}


export function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    title: "New Group",
    archivedAt: 1589983468418,
    tasks: [],
    style: utilService.getRandomColor(),
  };
}

