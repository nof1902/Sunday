import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoard, addBoard, removeBoard } from "../store/board.actions.js";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";
import { boardService } from "../services/board.service.local.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";

export function BoardIndex() {
  const currBoard = useSelector((storeState) => storeState.boardModule.currBoard);

  useEffect(() => {
    loadBoard();
  }, []);

  async function onRemoveCar(carId) {
    try {
      await removeBoard(carId);
      showSuccessMsg("Car removed");
    } catch (err) {
      showErrorMsg("Cannot remove car");
    }
  }

  async function onAddCar() {
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

  const { groups } = currBoard;
  console.log('_groups', groups);

  if (!currBoard) return <div>Loading...</div>;
  return (
    <section className="board-index">
      <BoardIndexHeader boards={currBoard} />
      <main>
       <GroupList groups={groups} />

        {/* <button onClick={onAddCar}>Add Car ⛐</button>
                <ul className="car-list">
                    {boards.map(car =>
                        <li className="car-preview" key={car._id}>
                            <h4>{car.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${car.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                            {shouldShowActionBtns(car) && <div>
                                <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                                <button onClick={() => { onUpdateCar(car) }}>Edit</button>
                            </div>}

                            <button onClick={() => { onAddCarMsg(car) }}>Add car msg</button>
                            <button className="buy" onClick={() => { onAddToCart(car) }}>Add to cart</button>
                        </li>)
                    }
                </ul> */}
      </main>
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
