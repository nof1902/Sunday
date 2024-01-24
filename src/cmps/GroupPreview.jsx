import { useEffect, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask, SaveTask } from "../store/board.actions.js"
import { useParams } from "react-router";

import { MdOutlineExpandMore } from "react-icons/md";



export function GroupPreview({ group, onSaveTask }) {
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
      onSaveTask(param.id, group.id, task)
      setInputFocused(null)
    }
    // console.log("log", inputFocused);
  }, [inputFocused])


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
  const title = Object.keys(tasks[0])
// console.log(title);

// console.log('num of tasks', tasks.length)


  console.log('task');
  return (
    <section className={groupClass}>
      <section className="group-header">
        <MdOutlineExpandMore className="collapse-group" />
        <h3>{group.title}</h3>
      </section>

      <section className="tasks-header">
        <h4>Item</h4>
        {
            title.slice(2).map((key, idx) => (
            <h4 key={`${key}${idx}`}>{key}</h4>
          ))
        }
      </section>

    <TaskList tasks={tasks} />

      <section className="group-footer">
        <div className="footer-new-task">
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


