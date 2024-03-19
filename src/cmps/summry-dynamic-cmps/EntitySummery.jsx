import { useEffect, useRef, useState } from "react";
import { utilService } from "../../services/util.service";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";


export function EntitySummery({ group, summeryEntity, entityPicker }) {
  
  const [hoveredEntity, setHoveredEntity] = useState(false);
  const totalTasks = group.tasks.length;

  const entityCounts = group.tasks.reduce((acc, task) => {
    const key = task[summeryEntity];
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const summeryEntityPercentage = Object.keys(entityCounts).reduce(
    (acc, key) => {
      acc[key] = (entityCounts[key] / totalTasks) * 100;
      return acc;
    },
    {}
  );

  const sortOrder = entityPicker.reduce((acc, entity, index) => {
    acc[entity.label] = index;
    return acc;
  }, {});

  function sortByPickerOrder(a, b) {
    return sortOrder[a[0]] - sortOrder[b[0]];
  };

  const sortedEntries = Object.entries(summeryEntityPercentage).sort(sortByPickerOrder);

  function setBackgroundColor(summeryEntityToFind) {
    if (totalTasks > 0) {
      const selectedEntityBackgroundColor = entityPicker.find(
        (entity) => entity.label === summeryEntityToFind
      );
      return selectedEntityBackgroundColor  ? selectedEntityBackgroundColor.backgroundColor : "rgb(196, 196, 196)";
    } else {
      return "rgb(196, 196, 196)";
    }
  }

  return (
    <section className="entity-summary">
      {sortedEntries.map(([entity, percent]) => (
        <div
          key={entity}
          className={`entity-progress ${entity}`}
          onMouseEnter={() => setHoveredEntity(entity)}
          onMouseLeave={() => setHoveredEntity(null)}
          style={{
            width: `${percent}%`,
            backgroundColor: setBackgroundColor(entity),
          }}
        >
          {hoveredEntity === entity && (
            <div className="tooltip">
              <div>{`${entityCounts[entity]}/${totalTasks}`}</div>
              <div>{`${percent.toFixed(2)}%`}</div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}


/*

import { useEffect, useRef, useState } from "react";
import { utilService } from "../../services/util.service";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function PrioritySummery({ group, summeryEntity, priorityPicker }) {
  const [hoveredEntity, setHoveredEntity] = useState(false);
  const totalTasks = group.tasks.length;

  const priorityCounts = group.tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const priorityPercentage = Object.keys(priorityCounts).reduce(
    (acc, priority) => {
      acc[priority] = (priorityCounts[priority] / totalTasks) * 100;
      return acc;
    },
    {}
  );

  console.log("priorityPercentage", priorityPercentage);

  function setBackgroundColor(priorityToFind) {
    if (totalTasks > 0) {
      const selectedPriorityBackgroundColor = priorityPicker.find(
        (priority) => priority.label === priorityToFind
      );
      return selectedPriorityBackgroundColor.backgroundColor;
    } else {
      return "rgb(196, 196, 196)";
    }
  }

  return (
    <section className="priority-summary">
      {Object.entries(priorityPercentage).map(([priority, percent]) => (
        <div
          key={priority}
          className={`priority-progress ${priority}`}
          onMouseEnter={() => setHoveredEntity(priority)}
          onMouseLeave={() => setHoveredEntity(null)}
          // title={`${percent.toFixed(2)}%`}
          style={{
            width: `${percent}%`,
            backgroundColor: setBackgroundColor(priority),
          }}
        >
          {hoveredEntity === priority && (
            <div className="tooltip">
              <div>{`${priorityCounts[priority]}/${totalTasks}`}</div>
              <div>{`${percent.toFixed(2)}%`}</div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}



*/