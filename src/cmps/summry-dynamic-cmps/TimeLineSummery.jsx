
import { differenceInDays, format, formatDistance, isAfter, isPast } from "date-fns";
import { useState } from "react";

export function TimeLineSummery({ group }) {

  const [isHovered, setIsHovered] = useState(false);
  let minDate = new Date()
  let maxDate = new Date(0)

  group.tasks.forEach((task) => {
    const taskStart = new Date(task.timeLine?.from);
    const taskEnd = new Date(task.timeLine.to);

    if (taskStart < minDate) {
      minDate = taskStart;
    }

    if (taskEnd > maxDate) {
      maxDate = taskEnd;
    }
  });

  const hasTimelineData = group.tasks.length > 0

  function calculateTimeLeftToBackgroundColor( from , to ) {

    if(!hasTimelineData){
      return {
        pastStyle: {
          width: `50%`,
          background: "rgb(196, 196, 196)",
        },
        futureStyle: {
          width: `50%`,
          background: "rgb(196, 196, 196)",
        },
      };
    }
    const totalDuration = differenceInDays(to, from);
    const daysLast = differenceInDays(new Date(), from);
    const pastRatio = (daysLast / totalDuration) * 100;
    const futureRatio = 100 - pastRatio;

    const pastColor = isPast(from) ? group.style :'#000000';
    const futureColor = isAfter(to, new Date()) ? '#000000' : group.style;
    
    return {
      pastStyle: {
        width: `${pastRatio}%`,
        background: pastColor,
      },
      futureStyle: {
        width: `${futureRatio}%`,
        background: futureColor,
      },
    };
  }

  const backgroundStyle = calculateTimeLeftToBackgroundColor(minDate, maxDate);

  function onHover() {
    if (!hasTimelineData) return "-"; 
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="time-line-btn"
        >
          <div className="background-color-past" style={backgroundStyle.pastStyle} />
        <div className="background-color-future" style={backgroundStyle.futureStyle} />
          <span className="time-for-task summery">{onHover()}</span>
        </button>
      </section>
    );
  
}




