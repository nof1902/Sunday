// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true,
})

// const BASE_URL = (process.env.NODE_ENV !== 'development') ?
//     '/api/' :
//     '//localhost:3030/api/'

const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    create,
    update,
    remove
}
window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(BASE_URL, filterBy)

    // const {data: boards} = await axios.get(BASE_URL, {params: filterBy})
    // return boards

}

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
    // const {data: boards} = await axios.get(BASE_URL, boardId)
    // return boards
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
    // const {data: board} = await axios.delete(BASE_URL + boardId)
    // return board
}

async function create(boardTitle) {
    savedBoard = await httpService.post(BASE_URL, boardTitle)
    // const {data: savedBoard} = await axios post(BASE_URL, boardTitle)
    return savedBoard
}

async function update(board) {
    savedBoard = await axios.put(BASE_URL, board)
    return savedBoard
}

// async function addBoardMsg(boardId, txt) {
//     const savedMsg = await httpService.post(`${BASE_URL}${boardId}/msg`, { txt })
//     return savedMsg
// }


// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         speed: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }