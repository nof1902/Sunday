import { useEffect, useRef, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask } from "../store/actions/board.actions.js";
import { useParams } from "react-router";

import { MdOutlineExpandMore } from "react-icons/md";
import { func } from "prop-types";
import { useDebounce } from "../customHooks/useDebounce.js";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";

export function GroupPreview({
  group,
  onSaveTask,
  onRemoveTask,
  onRemoveGroup,
  onUpdateGroup,
  cmpsOrder,
}) {
  const param = useParams();

  const [task, setTask] = useState(createEmptyTask());
  const [currGroup, setCurrGroup] = useState(group);
  const debouncedGroup = useDebounce(currGroup);
  const [inputFocused, setInputFocused] = useState(null);
  const [isTitleGroupEditMode, setIsTitleGroupEditMode] = useState(null);
  const [ispreview, setIspreview] = useState(true);
  const groupClass = ispreview ? "group-preview" : "group-unpreview";

  useEffect(() => {
    if (inputFocused === false && task !== getEmptyTask()) {
      onSaveTask(param.id, group.id, task);
      currGroup.tasks.push(task);
      setTask(getEmptyTask());
      setInputFocused(null);
    }
  }, [inputFocused]);

  useEffectUpdate(() => {
    onUpdateGroup(param.id, currGroup);
  }, [debouncedGroup]);

  function createEmptyTask() {
    const newTask = getEmptyTask();
    cmpsOrder.forEach((component) => {
      newTask[component] = {};
    });
    return newTask;
  }

  function handleGroupTitleBlur({ target }) {
    if (target.value !== "") setIsTitleGroupEditMode(false);
  }

  function handleGroupTitleChange({ target }) {
    const { name: field, value } = target;
    setCurrGroup((prevGroup) => ({ ...prevGroup, [field]: value }));
  }

  function handleTaskInputBlur({ target }) {
    if (target.value !== "") setInputFocused(false);
    target.value = "";
  }

  function handleTaskInputFocus() {
    setInputFocused(true);
  }

  function saveTaskCall(task) {
    onSaveTask(param.id, group.id, task);
  }

  function handleTaskChange({ target }) {
    const { name: field, value } = target;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
    console.log("task", task);
  }

  function deleteTask(taskId) {
    onRemoveTask(group.id, taskId);
  }

  const { tasks } = group;


  return (
    <section className={groupClass}>
      <section className="group-header">
        <button className="delete-btn" onClick={() => onRemoveGroup(group.id)}>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20"
            height="20"
            aria-hidden="true"
            className="icon_d24b689566 noFocusStyle_07ecef1878"
            data-testid="icon"
          >
            <path
              d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <svg
          viewBox="0 0 20 20"
          color={group.style}
          fill="currentColor"
          width="24"
          height="24"
          role="button"
          tabIndex="0"
          aria-hidden="false"
          className="icon_4b23d45e02 collapsible-icon clickable_f2c35f1e3f"
          data-testid="icon"
        >
          <path
            d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        {isTitleGroupEditMode ? (
          <input
            className="new-input text-style group-title"
            autoFocus
            style={{ color: group.style }}
            name="title"
            type="text"
            id="edit-group-title"
            value={currGroup.title}
            onChange={handleGroupTitleChange}
            onBlur={handleGroupTitleBlur}
          />
        ) : (
          <h3
            className="text-style"
            onClick={() => setIsTitleGroupEditMode(true)}
            style={{ color: group.style }}
          >
            {group.title}
          </h3>
        )}
      </section>
      <section
        className="tasks-table"
        style={{ borderInlineStart: `7px solid ${group.style}` }}
      >
        <section className="tasks-header">
          <h4>Item</h4>
          {cmpsOrder.map((key, idx) => (
            <h4 key={`${key}${idx}`}>{key}</h4>
          ))}
        </section>

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          saveTaskCall={saveTaskCall}
          cmpsOrder={cmpsOrder}
        />
      </section>
      <section className="group-footer">
        <div
          className="footer-new-task"
          style={{
            borderInlineStart: `7px solid ${group.style}`,
            opacity: ".5",
          }}
        >
          <label htmlFor="newTask" hidden>
            add new task
          </label>
          <input
            className="new-input"
            id="newTask"
            name="title"
            type="text"
            placeholder="+ Add item"
            onChange={handleTaskChange}
            onBlur={handleTaskInputBlur}
            onFocus={handleTaskInputFocus}
          />
        </div>
        {
          <section className="footer-stasus">
            <span></span>
            {cmpsOrder.map((item, idx) => (
              <span key={idx}></span>
            ))}
          </section>
        }
      </section>
    </section>
  );
}

// onKeyPress={handleKeyPress}

// useEffect(() => {
//   // const taskInput = taskTitleRef.current;

//   if (taskInput) {
//     taskInput.addEventListener('focus', handleFocus)
//     taskInput.addEventListener('blur', handleBlur)

//     return () => {
//       taskInput.removeEventListener('focus', handleFocus)
//       taskInput.removeEventListener('blur', handleBlur)
//     };

//   }

// }, []);

//   useEffectUpdate(() => {
//     onUpdateGroup(param.id,currGroup)
// }, [debouncedGroup])

// useEffect(() => {
//   if(isEditMode ===true && currGroup !== group){
//     onUpdateGroup(param.id,currGroup)
//   }
// }, [currGroup])
