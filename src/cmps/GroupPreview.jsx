import { TaskList } from "./TaskList.jsx";

export function GroupPreview({ group }) {
  const { tasks } = group;
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
