import { useEffect, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask, SaveTask } from "../store/board.actions.js"
import { useParams } from "react-router";

// SaveTask(boardId, groupId = null, task, activity = {})
export function GroupPreview({ group }) {
  // console.log("group", group)
  const { tasks } = group;
  // console.log("tasks", tasks)
  const param = useParams()

  const [inputFocused, setInputFocused] = useState(null);
  const [task, setTask] = useState(getEmptyTask());

  useEffect(() => {
    if(inputFocused === false){
      SaveTask(param.id, group.id, task)
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

  return (
    <section className="group-preview">
      <section className="group-header">
        <h3>{group.title}</h3>
      </section>

      <section className="tasks-header">
        <h4>Item</h4>
        {
          // map on tasks
        }
        <h4>2</h4>
        <h4>3</h4>
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
        //   <section className="footer-stasus">
        //   <div>1</div>
        //   <div>2</div>
        //   <div>3</div>
        // </section>
      }
      </section>
    </section>
  );
}

// onKeyPress={handleKeyPress}
