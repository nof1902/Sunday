// import routes from '../routes'
import {
    NavLink, useParams,
  } from "react-router-dom";
  import { svgService } from "../svg.service";
  import { useEffect, useRef, useState } from "react";
  import { AddBoardModal } from "./AddBoardModal";
import { OptionsCmp } from "./OptionsCmp";
import { useForm } from "../customHooks/useForm";
  
  export function SideNavPreview({ board, onRemoveBoard, onUpdateBoard }) {

    const [isOptionsModalOpen,SetIsOptionsModalOpen] = useState(false)
    const [editBoard, setEditBoard, handleChange] = useForm(board);
    const [isEditMode,setIsEditMode] = useState(false)
    const activeBoardId = useParams() 
    
    useEffect(() => {
      setEditBoard(board);
    }, [board]);
    
    function handleBlur() {
        setIsEditMode(!isEditMode)
        onUpdateBoard(editBoard);
    }

    function onOpenMoreOptions(){
        SetIsOptionsModalOpen(!isOptionsModalOpen)
    }

    function onRenameBoard(){
        onOpenMoreOptions()
        setIsEditMode(!isEditMode)
    }


    return (
            <li key={board._id} style={{background: (activeBoardId.id === board._id)? `#cce5ff`: ``}} className="board-preview">
                    <NavLink className='board-link' key={board._id} to={`/boards/${board._id}`}>
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            width="19"
                            height="19"
                            aria-hidden="true"
                            aria-label="Public board"
                            className="icon-board"
                            >
                            <path
                                d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {isEditMode?
                            (<input
                                type="text"
                                name="title"
                                value={editBoard.title}
                                placeholder="new board title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                            />) :(
                                <h4 className="board-title">{board.title}</h4>
                            )} 
                    </NavLink>
                    <button className="more-btn-show" onClick={(ev, board) => onOpenMoreOptions(ev,board)}>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="16"
                        height="16"
                        aria-hidden="true"
                        className="more-icon"
                        data-testid="icon">
                        <path
                          d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                    {isOptionsModalOpen && <OptionsCmp board={board} onRemoveBoard={onRemoveBoard} onRenameBoard={onRenameBoard} onOpenMoreOptions={onOpenMoreOptions}/>}
            </li>
    );
  }
  // {isOptionsModalOpen && <OptionsCmp board={board} onRemoveBoard={onRemoveBoard} onRenameBoard={onRenameBoard} onOpenMoreOptions={onOpenMoreOptions}/>}

  /*
  
  <NavLink className='board-link' key={board._id} to={`/boards/${board._id}`}>
                <li key={board._id} className="board">
                  <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="19"
                      height="19"
                      aria-hidden="true"
                      aria-label="Public board"
                      className="icon-board"
                    >
                      <path
                        d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h4 className="board-title">{board.title}</h4>
                    <button className="more-btn-show" onClick={(ev, board) => onOpenMoreOptions(ev,board)}>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="16"
                        height="16"
                        aria-hidden="true"
                        className="more-icon"
                        data-testid="icon">
                        <path
                          d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                </li>
                {isOptionsModalOpen && <OptionsCmp board={board} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />}
              </NavLink>

  */
  
  
  
  

  