import { useEffect, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask } from "../store/board.actions.js"
import { useParams } from "react-router";

import { MdOutlineExpandMore } from "react-icons/md";


export function GroupPreview({ group, onSaveTask , onRemoveTask, onRemoveGroup, onUpdateGroup}) {
  const param = useParams()

  const [inputFocused, setInputFocused] = useState(null)
  const [task, setTask] = useState(getEmptyTask())
  const [currGroupTitle, setCurrGroupTitle] = useState(group.title)

  const [isEditMode, setIsEditMode] = useState(false)
  const [ispreview, setIspreview] = useState(true)
  const groupClass = ispreview?  "group-preview" : "group-unpreview"

  useEffect(() => {
    if(inputFocused === false && task !== getEmptyTask()){
      onSaveTask(param.id, group.id, task)
      setTask(getEmptyTask())
      setInputFocused(null)
    }

    else if(currGroupTitle !== group.title){
      const currGroup = {...group, ...title = currGroupTitle}
      onUpdateGroup(param.id,currGroup)
    }

  }, [inputFocused,task,currGroupTitle])


  function handleInputFocus(){
    setInputFocused(true)
  }

  function handleInputBlur({ target }){
    target.value = ''
    setInputFocused(false)
  }

  // function handleKeyPress(e){
  //   if (e.key === 'Enter') {
  //     setInputFocused(false); 
  //   }
  // }

  function deleteTask(taskId){
    onRemoveTask(group.id,taskId)
  }

  function handleGroupTitleChange({ target }){
    const { name: field, value } = target
    setCurrGroupTitle(prevTile => ({ ...prevTile, [field]: value }))
  }

  function handleTaskChange({ target }){
    const { name: field, value } = target
    setTask(prevTask => ({ ...prevTask, [field]: value }))
  }

  const { tasks } = group

  var title = Object.keys(getEmptyTask())
  if(tasks && tasks.length !== 0){
    title = Object.keys(tasks[0])
  }
  
// console.log('group.style', group.style);
// console.log('num of tasks', tasks.length)

  return (
    <section className={groupClass}>
      <section className="group-header">
        <button className="delete-btn" onClick={() => onRemoveGroup(group.id)}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_d24b689566 noFocusStyle_07ecef1878" data-testid="icon"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor"></path></svg>
        </button>
        <svg viewBox="0 0 20 20" color={group.style}fill="currentColor" width="24" height="24" role="button" tabIndex="0" aria-hidden="false" className="icon_4b23d45e02 collapsible-icon clickable_f2c35f1e3f" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>  
        {isEditMode ? 
          <input className="new-input" style={{ color: group.style }} name="title" type="text" value={group.title} onChange={handleGroupTitleChange} /> 
        : 
          <h3 onClick={() => setIsEditMode(!isEditMode)} style={{ color: group.style }}>{group.title}</h3>
        }
      </section>
    <section className="tasks-table" style={{ borderInlineStart: `7px solid ${group.style}` }}>
      <section className="tasks-header">
        <h4>Item</h4>
        {
            title.slice(2).map((key, idx) => (
            <h4 key={`${key}${idx}`}>{key}</h4>
          ))
        }
      </section>

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </section>
      <section className="group-footer">
        <div className="footer-new-task" style={{ borderInlineStart: `7px solid ${group.style}`, opacity: '.5'}}>
          <label htmlFor="newTask" hidden>
            add new task
          </label>
          <input
            className="new-input"
            id="newTask"
            name="title"
            type="text"
            placeholder="+ Add item"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            // onKeyDown={handleKeyPress}
            onChange={handleTaskChange}
          />
        </div>
        {
          <section className="footer-stasus">

            <span></span>
            {title.slice(2).map((item, idx) => (
              <span key={idx}></span>
            ))}
        
        </section>
      }
      </section>
    </section>
   
  );
}

// onKeyPress={handleKeyPress}


