import { useEffect, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask, SaveTask } from "../store/board.actions.js"
import { useParams } from "react-router";

import { MdOutlineExpandMore } from "react-icons/md";



export function GroupPreview({ group, onSaveTask , onRemoveTask}) {
  // console.log("group", group)
  // const { tasks } = group;
  // console.log("tasks", tasks)
  const param = useParams()

  const [inputFocused, setInputFocused] = useState(null);
  const [task, setTask] = useState(getEmptyTask());

  const [ispreview, setIspreview] = useState(true)
  const groupClass = ispreview?  "group-preview" : "group-unpreview"


  useEffect(() => {
    if(inputFocused === false){
      const currTask = task
      setTask(null)
      setInputFocused(null)
      onSaveTask(param.id, group.id, currTask)
    }
    // console.log("log", inputFocused);
  }, [inputFocused,task])


  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Handle Enter key press
      setInputFocused(false); // You can also keep it true if desired
      
    }
  };

  function handleChange(ev){
    const val = ev.target.value;
    setTask(prevTask => ({ ...prevTask, title: val }))
}

  const { tasks } = group

  var title = Object.keys(getEmptyTask())
  if(tasks && tasks.length !== 0){
    title = Object.keys(tasks[0])
  }
console.log('group.style', group.style);

// console.log('num of tasks', tasks.length)

  return (
    <section className={groupClass}>
      <section className="group-header">
        {
          // <MdOutlineExpandMore className="collapse-group" />
        }
        <svg viewBox="0 0 20 20" color={group.style}fill="currentColor" width="24" height="24" role="button" tabIndex="0" aria-hidden="false" className="icon_4b23d45e02 collapsible-icon clickable_f2c35f1e3f" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        <h3 style={{ color: group.style }}>{group.title}</h3>
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

      <TaskList tasks={tasks} onRemoveTask={onRemoveTask} />
    </section>
      <section className="group-footer">
        <div className="footer-new-task" style={{ borderInlineStart: `7px solid ${group.style}`, opacity: '.5'}}>
          <label htmlFor="newTask" hidden>
            add new task
          </label>
          <input
            className="new-task-input"
            id="newTask"
            name="newTask"
            type="text"
            placeholder="+ Add item"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
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


