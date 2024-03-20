
import { format } from "date-fns";

export function TimeLineSummery({ group }) {

  let minDate = new Date()
  let maxDate = new Date(0)

  group.tasks.forEach((task) => {
    const taskStart = new Date(task.timeLine.from);
    const taskEnd = new Date(task.timeLine.to);

    if (taskEnd < minDate) {
      minDate = taskEnd;
    }

    if (taskStart > maxDate) {
      maxDate = taskStart;
    }
  });

  const hasTimelineData = group.tasks.length > 0

  function setBackgroundColor() {
    return hasTimelineData ? `#333333` : "rgb(196, 196, 196)"
  }

  const timelineSummary = hasTimelineData
  ? `${format(minDate, "LLL d")} - ${format(maxDate, "LLL d")}`
  : '-';

    return (
      <section className="timeline">
        <button
          style={{ background: setBackgroundColor() }}
          className="time-line-btn"
        >
          <span className="time-for-task summery">{timelineSummary}</span>
        </button>
      </section>
    );
  
}




