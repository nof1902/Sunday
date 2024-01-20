import { TaskList } from "./TaskList.jsx";

export function GroupPreview({ group }) {

  const { tasks } = group;
  return (
    <section className="group-preview">
      <h3>{group.title}</h3>
      <TaskList tasks={tasks}/>
      
    </section>
  );
}
