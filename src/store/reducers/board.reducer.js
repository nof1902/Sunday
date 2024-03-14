export const SET_BOARDS = 'SET_BOARDS'
export const GET_BOARD_BY_ID = 'GET_BOARD_BY_ID'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const CLEAN_CURR_BOARD = 'CLEAN_CURR_BOARD'
export const SET_BOARD = 'SET_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'

const initialState = {
    boards: [],
    currBoard: null,
    lastRemovedBoard: null
}

export function boardReducer(state = initialState, action = {}) {
    var newState = state
    var boards
    switch (action.type) {
        case SET_BOARDS:
            if(action.board?._id === newState.currBoard?._id){
                console.log('here')
                newState = { ...state, boards: action.boards, currBoard: action.board}    
            } else {
                newState = { ...state, boards: action.boards}
            }
            break
        case SET_BOARD:
            newState = { ...state, currBoard: action.board}
        break;
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] ,currBoard: action.board}
            break
        case CLEAN_CURR_BOARD:
            newState = { ...state, currBoard: null}
            break
        case UPDATE_BOARD:
            newState = { ...state, currBoard: action.board}
            break
        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break
        default:
    }
    return newState
}
