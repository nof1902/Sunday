import { boardService } from '../services/board.service.local.js'
import { userService } from '../services/user.service.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
//import { ADD_CAR, ADD_TO_CART, CLEAR_CART, REMOVE_CAR, REMOVE_FROM_CART, SET_CARS, UNDO_REMOVE_CAR, UPDATE_CAR } from './car.reducer.js'
import { REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_BOARDS, GET_BOARD_BY_ID ,UNDO_REMOVE_BOARD} from './board.reducer.js'
import { SET_SCORE } from './user.reducer.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load Boards', err)
        throw err
    }
}

export async function getBoardById(boardId = "b101") {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({
            type: GET_BOARD_BY_ID,
            board
        })

        return board;

    } catch (err) {
        console.log('Cannot load Boards', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove Board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add Board', err)
        throw err
    }
}

export function updateBoard(board) {
    return boardService.save(board)
        .then(savedBoard => {
            console.log('Updated Board:', savedBoard)
            store.dispatch(getActionUpdateBoard(savedBoard))
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save Board', err)
            throw err
        })
}

// by adding task from headerindex - the task automaticly
export async function SaveTask(boardId, groupId = null, task, activity = {}) {
    let board = await boardService.getById(boardId)
    board = await boardService.saveTask(boardId, groupId, task, activity)
    updateBoard(board)
}

export function getEmptyTask(){
    return {
        "id": "",
        "title": "New Task",
        "status": "",
        "priority": ""
    }
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
    store.dispatch({
        type: REMOVE_BOARD,
        boardId
    })
    showSuccessMsg('Board removed')

    boardService.remove(carId)
        .then(() => {
            console.log('Server Reported - Deleted Successfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove car')
            console.log('Cannot load cars', err)
            store.dispatch({
                type: UNDO_REMOVE_BOARD,
            })
        })
}


export async function checkout(total) {
    try {
        const score = await userService.changeScore(-total)
        store.dispatch({ type: SET_SCORE, score })
        store.dispatch({ type: CLEAR_BoardT })
        return score
    } catch (err) {
        console.log('BoardActions: err in checkout', err)
        throw err
    }
}