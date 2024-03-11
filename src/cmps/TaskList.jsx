import { TaskPreview } from "./TaskPreview.jsx";

export function TaskList({
  tasks,
  deleteTask,
  saveTaskCall,
  cmpsOrder,
  statusPicker,
  priorityPicker,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskPreview
            task={task}
            deleteTask={deleteTask}
            saveTaskCall={saveTaskCall}
            cmpsOrder={cmpsOrder}
            statusPicker={statusPicker}
            priorityPicker={priorityPicker}
          />
        </li>
      ))}
    </ul>
  );
}
