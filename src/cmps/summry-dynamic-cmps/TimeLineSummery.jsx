
import { format, formatDistance } from "date-fns";
import { useState } from "react";

export function TimeLineSummery({ group }) {

  const [isHovered, setIsHovered] = useState(false);
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

  function onHover() {
    if (!hasTimelineData) return "-"; // Return a placeholder if there's no selected timeline
    if (isHovered) {
      return formatDistance(minDate, maxDate);
    } else {
      if (format(minDate, "LLL") !== format(maxDate, "LLL")) {
        return `${format(minDate, "LLL d")}-${format(maxDate, "LLL d")}`;
      } else {
        return `${format(minDate, "d")}-${format(maxDate, "d LLL")}`;
      }
    }
  }

    return (
      <section className="timeline">
        <button
          style={{ background: setBackgroundColor() }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="time-line-btn"
        ><span className="time-for-task summery">{onHover()}</span>
        </button>
      </section>
    );
  
}




