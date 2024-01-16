
// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'car'

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
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(carId) {
    return httpService.get(`car/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`car/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`car/${car._id}`, car)

    } else {
        savedCar = await httpService.post('car', car)
    }
    return savedCar
}

async function addBoardMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyBoard() {
    return {
            "_id": "b101",
            "title": "first board",
            "isStarred": false,
            "archivedAt": 1589983468418,
            "createdBy": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
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





