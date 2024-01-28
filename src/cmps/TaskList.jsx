import { TaskPreview } from "./TaskPreview.jsx";

export function TaskList({ tasks, deleteTask }) {
  
  return (
    <ul className="task-list">
    {tasks.map((task) => (
      <li key={task.id}>
        <TaskPreview task={task} deleteTask={deleteTask} />
      </li>
    ))}
    </ul>
  );
}

