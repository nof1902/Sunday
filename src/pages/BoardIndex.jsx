import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadBoards, addBoard, removeBoard, updateBoard, getBoardById, RemoveTask, getEmptyBoard } from "../store/board.actions.js";
import { useParams} from "react-router-dom";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardsList } from "../cmps/BoardsList.jsx";
import { SideNav } from "../cmps/SideNav.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { BoardDetails } from "./BoardDetails.jsx";


export function BoardIndex() {
  
  const params = useParams()
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  
  useEffect(() => {
    loadBoards()
  }, [])


  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showSuccessMsg(`Could not add task`)
      console.log('error',err)
    }
  }

  async function onAddBoard(Boardtitle) {
    try {
      const newBoard = getEmptyBoard()
      newBoard.title = Boardtitle
      addBoard(newBoard)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showSuccessMsg(`Could not add task`)
      console.log('error',err)
    }
  }

  async function onUpdateBoard(boardToSave) {
    try {
        await updateBoard(boardToSave)
        showSuccessMsg(`board updated`)
    } catch (err) {
        showErrorMsg('Cannot update board')
        console.log('error',err)
    }
  }

  if (!boards) return <div>Loading...</div>

  return (
    <section className="board-index">
      <section className="header">
        <AppHeader />
      </section>
      <section className="side-nav">
        <SideNav boards={boards} onRemoveBoard={onRemoveBoard} onAddBoard={onAddBoard} onUpdateBoard={onUpdateBoard}/>
      </section>
      <section className="board-main">
        {!params.id && (<BoardsList boards={boards}/>)}
        {params.id && <BoardDetails />}
      </section>
    </section>
  );
}

// async function onUpdateCar(car) {
//     const price = +prompt('New price?')
//     const carToSave = { ...car, price }
//     try {
//         const savedCar = await updateCar(carToSave)
//         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
//     } catch (err) {
//         showErrorMsg('Cannot update car')
//     }
// }

// function onAddToCart(car){
//     console.log(`Adding ${car.vendor} to Cart`)
//     addToCart(car)
//     showSuccessMsg('Added to Cart')
// }

// function onAddCarMsg(car) {
//     console.log(`TODO Adding msg to car`)
//     try {
//         showSuccessMsg(`Car msg added, it now has: ${3}`)
//     } catch (err) {
//         showErrorMsg('Cannot update car')
//     }

// }


/* 




  async function onAddBoard() {
    const board = boardService.getEmptyBoard();
    board.title = prompt("Title?");
    try {
      const savedBoard = await addBoard(board);
      showSuccessMsg(`board added (id: ${savedBoard._id})`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }

  async function onRemove(carId) {
    try {
      await removeBoard(carId);
      showSuccessMsg("Car removed");
    } catch (err) {
      showErrorMsg("Cannot remove car");
    }
  }

  async function onAddGroup() {
    const board = boardService.getEmptyBoard();
    board.title = prompt("Title?");
    try {
      const savedBoard = await addBoard(board);
      showSuccessMsg(`board added (id: ${savedBoard._id})`);
    } catch (err) {
      showErrorMsg("Cannot add board");
    }
  }
  
  function shouldShowActionBtns(car) {
    const user = userService.getLoggedinUser();
    if (!user) return false;
    if (user.isAdmin) return true;
    return car.owner?._id === user._id;
  }

*/
