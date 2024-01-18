import { TaskPreview } from "./TaskPreview.jsx";

export function TaskList({ tasks }) {
  // console.log("groups", groups)
  return (
    <ul className="task-list">
    {tasks.map((task) => (
      <li key={task.id}>
        <TaskPreview task={task} />
      </li>
    ))}
    </ul>
  );
}

