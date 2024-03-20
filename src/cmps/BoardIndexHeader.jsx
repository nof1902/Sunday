import { utilService } from "../services/util.service";
import { svgService } from "../services/svg.service";
import {
  SaveTask,
  getEmptyGroup,
  getEmptyTask,
} from "../store/actions/board.actions";
import { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";
import { OptionsActionsCmp } from "./OptionsActionsCmp";

// import { storeSaveTask } from "../store/board.actions"

export function BoardIndexHeader({
  board,
  onSaveTask,
  onSaveGroup,
  onUpdateBoard,
}) {
  const [editBoard, setEditBoard, handleChange] = useForm(board);
  const [isOptionsModalOpen,setIsOptionsModalOpen] = useState(false)

  useEffect(() => {
    setEditBoard(board);
  }, [board]);

  async function handleBlur() {
    await onUpdateBoard(editBoard);
  }

  function createEmptyTask() {
    const newTask = getEmptyTask();
    board.cmpsOrder.forEach((component) => {

      if(newTask[component] === 'timeLine'){
        newTask[component] ={};
      } else {
        newTask[component] = ''
      }
    });
    return newTask;
  }

  function handleSetModal() {
    setIsOptionsModalOpen(!isOptionsModalOpen)
  }

  return (
    <section className="board-index-header">
      <section className="head-title">
        <input
          type="text"
          name="title"
          value={editBoard.title}
          placeholder="new board title"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <p>
          Manage any type of project. Assign owners, set timelines and keep
          track of where your project stands
        </p>
      </section>

      <section className="board-data-display">
        <div className="selected-tab">
          <section className="main-table-tab">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              width="16"
              height="16"
              aria-hidden="true"
              className="icon_4b23d45e02 leftIcon_0e9d75fef6 noFocusStyle_cff5f5a050"
              data-testid="icon"
            >
              <path
                d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Main Table</span>
          </section>
        </div>

        <button className="plus-btn">
          <span>+</span>
        </button>
      </section>
      <section className="board-actions">
        <section className="addition-actions">
          <button
            className="add-task"
            onClick={() => onSaveTask(null, createEmptyTask())}
          >
            New task
          </button>
          <button
            className="add-group"
            onClick={handleSetModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {isOptionsModalOpen && <OptionsActionsCmp onAction={onSaveGroup} handleSetModal={handleSetModal} actionType={'addGroup'}/>}
        </section>
      </section>
    </section>
  );
}

