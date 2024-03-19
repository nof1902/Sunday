import { TaskPreview } from "./TaskPreview.jsx";
import { Draggable } from "react-beautiful-dnd"

export function TaskList({
  tasks,
  deleteTask,
  saveTaskCall,
  cmpsOrder,
  statusPicker,
  priorityPicker,
  members,
}) {


  return (
    <ul className="task-list">
      {tasks.map((task, idx) => (
        <Draggable draggableId={task.id} key={task.id} index={idx}>
        {(provided) => (
          <li key={task.id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
            <TaskPreview
              task={task}
              deleteTask={deleteTask}
              saveTaskCall={saveTaskCall}
              cmpsOrder={cmpsOrder}
              statusPicker={statusPicker}
              priorityPicker={priorityPicker}
              members={members}
            />
          </li>
        )}
        </Draggable>   
      ))}
    </ul>
  );
}
