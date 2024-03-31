// import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'
import Axios from 'axios'
import { utilService } from './util.service'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/board/' :
    '//localhost:3030/api/board/'

export const boardService = {
    query,
    getById,
    create,
    update,
    remove,
    getGroupFromBoardById,
    saveTask,
    removeTask,
    removeGroup,
    saveGroup,
}
window.cs = boardService

// ***************// HTTP REQUESTS // ***************// HTTP REQUESTS // ***************// HTTP REQUESTS // ***************//
async function query(filterBy = { txt: '' }) {
    // return httpService.get(BASE_URL, filterBy)
    const {data: boards} = await axios.get(BASE_URL, {params: filterBy})
    return boards
}

async function getById(boardId) {
    // return httpService.get(BASE_URL + boardId)
    const url = BASE_URL + boardId
    const {data: boards} = await axios.get(url)
    return boards
}

async function remove(boardId) {
    // return httpService.delete(BASE_URL + boardId)
    const url = BASE_URL + boardId
    const {data: board} = await axios.delete(url)
    return board
}

async function create(title) {

  console.log("boardTitle" , title)
    // savedBoard = await httpService.post(BASE_URL, boardTitle)
    const {data: savedBoard} = await axios.post(BASE_URL , {title})
    return savedBoard
}

async function update(board) {
    const url = BASE_URL + board._id
    const {data: updatedBoard} = await axios.put(url , board)
    return updatedBoard
}

// ***************// HTTP REQUESTS // ***************// HTTP REQUESTS // ***************// HTTP REQUESTS // ***************//



// BOARD SERVICE FUNCTION // ------------- // BOARD SERVICE FUNCTION // ------------- // BOARD SERVICE FUNCTION // ------------- //

function getGroupFromBoardById(board, groupId) {
    return board.groups.find((group) => group.id === groupId);
  }
  
  async function saveTask(board, groupId, task, activity) {
    
    // if there is not specific group -> add to first group
    var groupToAddTaskTo = board.groups[0];
  
    // if there is specific group -> add according to groupId
    if (groupId) {
      groupToAddTaskTo = getGroupFromBoardById(board, groupId);
    }
  
    // check if it is an update
    if (task && task.id) {
      const tasks = groupToAddTaskTo.tasks.map((existTask) => {
        return existTask.id === task.id ? task : existTask;
      });
      groupToAddTaskTo = { ...groupToAddTaskTo, tasks: tasks };
    } else {
      task.id = utilService.makeId();
      groupToAddTaskTo.tasks.push(task);
    }
  
    board.groups = board.groups.map((g) => (g.id === groupToAddTaskTo.id ? groupToAddTaskTo : g));
  
    // board = saveGroup(board, null, groupToAddTaskTo, activity)
    return board;
  }
  
  async function removeTask(board, groupId, taskId, activity) {
    let group = getGroupFromBoardById(board, groupId);
    const filteredTasks = group.tasks.filter(
      (existTask) => existTask.id !== taskId
    );
    group = { ...group, tasks: filteredTasks };
  
    board.groups = board.groups.map((g) => (g.id === group.id ? group : g));
  
    // board.activities.unshift(activity)
    return board;
  }
  
  async function removeGroup(board, groupId, activity) {
    const filteredGroups = board.groups.filter((g) => g.id !== groupId);
    board = { ...board, groups: filteredGroups };
    // board.activities.unshift(activity)
    return board;
  }
  
  async function saveGroup(board, index = null, group, activity) {
    // if new group
    if (index === 0) {
      board.groups.unshift(group);
    } else if (index > 0) {
      board.groups.push(group);
    } else if (!index) {
      //if update
      board.groups = board.groups.map((g) => (g.id === group.id ? group : g));
    }
    // board.activities.unshift(activity)
    return board;
  }



// BOARD SERVICE FUNCTION // ------------- // BOARD SERVICE FUNCTION // ------------- // BOARD SERVICE FUNCTION // ------------- //


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

