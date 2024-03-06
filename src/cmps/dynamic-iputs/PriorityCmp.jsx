import { useState } from "react";
import { utilService } from "../../services/util.service";


export function PriorityCmp({ info, onUpdate }) {
  const [priority, setPriority] = useState(info);

  const priorityInfo = [
    {
      id: utilService.makeId(),
      label: "Critical",
      backgroundColor: "rgb(51, 51, 51)",
    },
    {
      id: utilService.makeId(),
      label: "High",
      backgroundColor: "rgb(64, 22, 148)",
    },
    {
      id: utilService.makeId(),
      label: "Medium",
      backgroundColor: "rgb(85, 89, 223)",
    },
    {
      id: utilService.makeId(),
      label: "Low",
      backgroundColor: "rgb(87, 155, 252)",
    },
    {
      id: utilService.makeId(),
      label: "",
      backgroundColor: "rgb(196, 196, 196)",
    },
  ];

  function onChangePriority({ label, backgroundColor }) {
    info.selectedPriority = { label: label, backgroundColor: backgroundColor };
    info.priorities = prioritiesList;
    onUpdate(info);
  }

  const backgroundColor = priority.backgroundColor

  return (
    
    <section style={{ background: backgroundColor }} className="dynamic-cmp-list-items">
      <section style={{ background: backgroundColor }} className="selected-item">
        <h1>hey {info.selectedPriority.label}</h1>
      </section>
      {/* <ul className="items-container">
                {
                    prioritiesList.map((priority) => 
                        <li className="item" key={priority.id} onClick={() => onChangePriority(priority)}
                            style={{ backgroundColor: priority.backgroundColor }}
                            label={priority.label}>
                        </li>
                    )
                }
            </ul> */}

        
    </section>
  );
}
