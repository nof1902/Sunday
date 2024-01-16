
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

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
    var boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => car.price <= filterBy.price)
    // }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

function getEmptyBoard() {
    return {
            "_id": "b101",
            "title": "first board",
            "isStarred": false,
            "archivedAt": 1589983468418,
            "createdBy": {
                "_id": "",
                "fullname": "",
                "imgUrl": ""
            },
            "members": [
                {
                    "_id": "",
                    "fullname": "",
                    "imgUrl": ""
                }
            ],
            "groups": [
                {
                    "id": "g102",
                    "title": "Group 1",
                    "archivedAt": 1589983468418,
                    "tasks": [
                        {
                            "id": "t101",
                            "title": "Task 1",
                            "archivedAt": 1589983468418,
                        },
                        {
                            "id": "t102",
                            "title": "Task 2",
                            "status": "",
                            "priority": "", 
                            "comments": [
                                {
                                    "id": "",
                                    "txt": "",
                                    "createdAt": 1590999817436,
                                    "byMember": {
                                        "_id": "",
                                        "fullname": "",
                                        "imgUrl": ""
                                    }
                                }
                            ],
                        }
                    ],
                    "style": {}
                }
            ]
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




