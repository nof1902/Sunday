import { TaskPreview } from "./TaskPreview.jsx";

export function TaskList({ tasks, onRemoveTask }) {
  console.log("tasks", tasks.length)

  
  return (
    <ul className="task-list">
    {tasks.map((task) => (
      <li key={task.id}>
        <TaskPreview task={task} onRemoveTask={onRemoveTask} />
      </li>
    ))}
    </ul>
  );
}

