import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  loadBoards,
  addBoard,
  removeBoard,
  updateBoard,
  getEmptyBoard,
  getBoardById,
  updateBoardOptimistic,
  updateBoardFromBoards,
} from "../store/actions/board.actions.js";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardsList } from "../cmps/BoardsList.jsx";
import { SideNav } from "../cmps/SideNav.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";
import { BoardDetails } from "./BoardDetails.jsx";

export function BoardIndex() {
  const params = useParams();
  const navigate = useNavigate();
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const currBoardTitle = useSelector((storeState) => storeState.boardModule.currBoard?.title);

  useEffect(() => {
    loadBoards();
  }, [currBoardTitle]);

  async function onRemoveBoard(boardId) {
    try {
      if (params.id === boardId) {
        navigate(`/boards`);
      }
      await removeBoard(boardId);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onAddBoard(BoardTitle) {
    try {
      const newBoard = getEmptyBoard();
      newBoard.title = BoardTitle;
      addBoard(newBoard);
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateBoardTitle(boardToSave) {
    try {
      const updateBoards = boards.map((board) =>
        board._id === boardToSave._id ? boardToSave : board
      );
      await updateBoardFromBoards(updateBoards, boardToSave);
    } catch (err) {
      showErrorMsg("Cannot update board");
      console.log("error", err);
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

  if (!boards) return <div>Loading...</div>;

  return (
    <section className="board-index">
      <section className="header">
        <AppHeader />
      </section>
      <section className="side-nav">
        <SideNav
          boards={boards}
          onRemoveBoard={onRemoveBoard}
          onAddBoard={onAddBoard}
          onUpdateBoard={onUpdateBoardTitle}
        />
      </section>
      <div className="line"></div>
      <section className="board-main">
        {!params.id && <BoardsList boards={boards} />}
        {params.id && <BoardDetails currBoardTitle={currBoardTitle}/>}
      </section>
    </section>
  );
}
