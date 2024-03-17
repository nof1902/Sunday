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

export async function loadBoards(resetCurrBoard = false) {
  try {
    // store.dispatch({ type: LOADING_START })
    const boards = await boardService.query();
    console.log("Boards from DB:", boards);
    store.dispatch({
      type: SET_BOARDS,
      boards,
      resetCurrBoard
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
  } catch (err) {
    console.log("Cannot load Boards", err);
    throw err;
  }
}

export async function getBoardByID(boardId) {
  try {
    store.dispatch({
      type: SET_BOARD,
      boardId
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

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board);
    console.log("Added Board", savedBoard);
    store.dispatch(getActionAddBoard(savedBoard));
    return savedBoard;
  } catch (err) {
    console.log("Cannot add Board", err);
    throw err;
  }
}

export async function updateBoard(board) {
  return boardService
    .save(board)
    .then((savedBoard) => {
      store.dispatch(getActionUpdateBoard(savedBoard));
    })
    .catch((err) => {
      console.log("Cannot save Board", err);
      throw err;
    });
}


// by adding task from headerindex - the task automaticly
export async function SaveTask(boardId, groupId, task, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.saveTask(board, groupId, task, activity);
  updateBoard(board);
  return board;
}

export async function RemoveTask(boardId, groupId, taskId, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.removeTask(board, groupId, taskId, activity);
  updateBoard(board);
}

export async function SaveGroup(boardId, index, group, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.saveGroup(board, index, group, activity);
  updateBoard(board);
}

export async function RemoveGroup(boardId, groupId, activity = {}) {
  let board = await boardService.getById(boardId);
  board = await boardService.removeGroup(board, groupId, activity);
  updateBoard(board);
}

export async function setUrlParamId(urlParamsID) {
  store.dispatch({
    type: SET_URL_PARAM_ID,
    urlParamsID
  })
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
    .remove(carId)
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
    status: "Not Started",
    priority: "",
    timeline: '',
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

export function getEmptyBoard() {
  return {
    _id: "",
    title: "New board",
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: "",
      fullname: "",
      imgUrl: "",
    },
    members: [
      {
        _id: "",
        fullname: "",
        imgUrl: "",
      },
    ],
    groups: [getEmptyGroup()],
    cmpsOrder: ["status", "priority","timeline"],
    statusPicker: [
      { label: "Done", backgroundColor: " rgb(0, 200, 117)" },
      { label: "Working on it", backgroundColor: "rgb(253, 171, 61)" },
      { label: "Stuck", backgroundColor: "rgb(226, 68, 92)" },
      { label: "Not Started", backgroundColor: "rgb(196, 196, 196)" },
    ],
    priorityPicker: [
      { label: "Critical ⚠", backgroundColor: "rgb(51, 51, 51)" },
    { label: "High", backgroundColor: "rgb(64, 22, 148)" },
    { label: "Medium", backgroundColor: "rgb(85, 89, 223)" },
    { label: "Low", backgroundColor: "rgb(87, 155, 252)" },
    { label: "", backgroundColor: "rgb(196, 196, 196)" },
  ],
  };
}
