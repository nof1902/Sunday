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
