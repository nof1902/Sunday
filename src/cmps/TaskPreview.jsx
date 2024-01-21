export function TaskPreview({ task }) {
  return (
    <section className="task-preview">

      <div className="task-header">
        <span className="task-txt">{task.title}</span>
        <div></div>
      </div>

      <span>2</span>
      <span>3</span>
    </section>
  );
}
