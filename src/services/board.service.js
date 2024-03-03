// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg
}
window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(BASE_URL + board._id, board)
    } else {
        savedBoard = await httpService.post(BASE_URL, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    const savedMsg = await httpService.post(`${BASE_URL}${boardId}/msg`, { txt })
    return savedMsg
}


// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         speed: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }