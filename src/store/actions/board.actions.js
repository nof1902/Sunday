import { boardService } from '../../services/board.service.local.js'
import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
//import { ADD_CAR, ADD_TO_CART, CLEAR_CART, REMOVE_CAR, REMOVE_FROM_CART, SET_CARS, UNDO_REMOVE_CAR, UPDATE_CAR } from './car.reducer.js'
import { REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_BOARDS, GET_BOARD_BY_ID ,UNDO_REMOVE_BOARD} from '../reducers/board.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'
import { utilService } from '../../services/util.service.js'

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

export async function getBoardById(boardId) {
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
            // console.log('Updated Board:', savedBoard)
            store.dispatch(getActionUpdateBoard(savedBoard))
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save Board', err)
            throw err
        })
}

// by adding task from headerindex - the task automaticly
export async function SaveTask(boardId, groupId, task, activity = {}) {
    let board = await boardService.getById(boardId)
    board = await boardService.saveTask(board, groupId, task, activity)
    updateBoard(board)
    return board
}

export async function RemoveTask(boardId, groupId, taskId, activity = {}) {
    let board = await boardService.getById(boardId)
    board = await boardService.removeTask(board, groupId, taskId, activity)
    updateBoard(board)
}

export async function SaveGroup(boardId, index, group, activity = {}) {
    let board = await boardService.getById(boardId)
    board = await boardService.saveGroup(board, index, group, activity)
    updateBoard(board)
}

export async function RemoveGroup(boardId, groupId, activity = {}) {
    let board = await boardService.getById(boardId)
    board = await boardService.removeGroup(board, groupId, activity)
    updateBoard(board)
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
    
    export function getEmptyTask(){
        return {
            id: "",
            title: "New Task",
            priority: {},
            status: {},
        }
    }

    export function getEmptyGroup(){
        return  {
                id: utilService.makeId(),
                title: "New Group",
                archivedAt: 1589983468418,
                tasks: [],
                style: utilService.getRandomColor()
            }
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
        groups: [
            getEmptyGroup()
        ],
        style: utilService.getRandomColor(),
        cmpsOrder: ["status-picker", "priority-picker"],
        statusPicker: [ {label: 'Done', backgroundColor: ' rgb(0, 200, 117)'}, {label: 'Working on it', backgroundColor: 'rgb(253, 171, 61)'}, {label: 'Stuck', backgroundColor: 'rgb(226, 68, 92)'}, {label: 'Not Started', backgroundColor: 'rgb(196, 196, 196)'}],
    }
}

