import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";

const STORAGE_KEY = "board";

export const boardService = {
  query,
  getById,
  save,
  remove,
  addBoardMsg,
  saveTask,
  removeTask,
  saveGroup,
  removeGroup
};
window.cs = boardService;


// localStorage.clear()
// _createBoards()

async function query(filterBy = { status: "", title: "" }) {
  let boards = utilService.loadFromStorage(STORAGE_KEY);
  if (!boards || !boards.length) {
    _createBoards();
  }

  boards = await storageService.query(STORAGE_KEY);
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(car.vendor) || regex.test(car.description))
  // }
  // if (filterBy.price) {
  //     boards = boards.filter(board => car.price <= filterBy.price)
  // }
  return boards;
}

async function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId);
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  var savedBoard;
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser();
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}

function getGroupFromBoardById(board, groupId) {
  return board.groups.find((group) => group.id === groupId);
}

async function saveTask(board, groupId, task, activity) {
  // if there is not specific group -> add to first group
  var group = board.groups[0];
  // console.log('groups' , groups)

  // if there is specific group -> add according to groupId
  if (groupId) {
    group = getGroupFromBoardById(board, groupId);
  }

  // check if it is an update
  if (task && task.id) {
    group = group.tasks.map((existTask) => {
      return existTask.id === task.id ? task : existTask;
    });
  } else {
    task.id = utilService.makeId();
    group.tasks.push(task);
  }

  board.groups = board.groups.map((g) => (g.id === groupId ? group : g));
  // board.activities.unshift(activity)
  return board;
}

async function removeTask(board, groupId, taskId, activity) {
  let group = getGroupFromBoardById(board, groupId)
  const filteredTasks = group.tasks.filter(existTask => existTask.id !== taskId)
  group = { ...group, tasks: filteredTasks }
  board.groups = board.groups.map((g) => (g.id === group.id ? group : g));
  
  // board.activities.unshift(activity)
  return board;
}

async function removeGroup(board, groupId, activity) {

  const filteredGroups = board.groups.filter(g => g.id !== groupId)
  board = { ...board, groups: filteredGroups }
  // board.activities.unshift(activity)
  return board;
}

async function saveGroup(board,index = null ,group, activity) {

  // if new group
  if(index === 0){
    board.groups.unshift(group)
  } else if (index > 0){
    board.groups.push(group)
  } else if(!index){ //if update
    board.groups = board.groups.map((g) => (g.id === group.id ? group : g));
  }

  // board.activities.unshift(activity)

  return board;
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId);
  if (!board.msgs) board.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  board.msgs.push(msg);
  await storageService.put(STORAGE_KEY, board);

  return msg;
}

// function getEmptyTask(){
//     return {
//         "id": "",
//         "title": "New Task",
//         "status": "",
//         "priority": "",
//     }
// }


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

function _createBoards() {
  // let boards = utilService.loadFromStorage(STORAGE_KEY)
  // if (!boards || !boards.length){
  var boards = [
    {
      _id: utilService.makeId(),
      title: "First Board",
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
        {
          id: utilService.makeId(),
          title: "Group 1",
          archivedAt: 1589983468418,
          tasks: [
            {
              id: utilService.makeId(),
              title: "Task 1",
              status: "",
              priority: "",
            },
            {
              id: utilService.makeId(),
              title: "Task 2",
              status: "",
              priority: "",
            },
          ],
          style: utilService.getRandomColor(),
        },
        {
          id: utilService.makeId(),
          title: "Group 2",
          archivedAt: 1589983468418,
          tasks: [
            {
              id: utilService.makeId(),
              title: "Task 3",
              status: "",
              priority: "",
            },
            {
              id: utilService.makeId(),
              title: "Task 4",
              status: "",
              priority: "",
            },
          ],
          style: utilService.getRandomColor(),
        },
      ],
    },
    {
      _id: utilService.makeId(),
      title: "Second Board",
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
        {
          id: utilService.makeId(),
          title: "Group 1",
          archivedAt: 1589983468418,
          tasks: [
            {
              id: utilService.makeId(),
              title: "Task 5",
              status: "",
              priority: "",
            },
            {
              id: utilService.makeId(),
              title: "Task 6",
              status: "",
              priority: "",
            },
          ],
          style: utilService.getRandomColor(),
        },
      ],
    },
  ];

  // }
  utilService.saveToStorage(STORAGE_KEY, boards);
  console.log(boards.length, boards[0], boards[1]);
}
