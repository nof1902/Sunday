import { useState } from "react";
import { utilService } from "../../services/util.service";


export function PriorityCmp({ info, onUpdate }) {
    
    const priorityInfo = [{id: utilService.makeId(), label: 'Critical',backgroundColor: 'rgb(51, 51, 51)'},
                            {id: utilService.makeId(), label: 'High',backgroundColor: 'rgb(64, 22, 148)'},
                            {id: utilService.makeId(), label: 'Medium',backgroundColor: 'rgb(85, 89, 223)'},
                            {id: utilService.makeId(), label: 'Low',backgroundColor: 'rgb(87, 155, 252)'},
                            {id: utilService.makeId(), label: '',backgroundColor: 'rgb(196, 196, 196)'}]

    function onChangePriority({ label, backgroundColor}) {
        info.selectedPriority = {label: label, backgroundColor: backgroundColor}
        info.priorities = priorityInfo
        onUpdate(info)
    }

    console.log()
    // className="dynamic-cmp-list-items"
    return <section style={{ backgroundColor: "aquamarine" }}>
        <span>PriorityCmp</span>
    {
    //     <ul className="items-container">
    //     {
    //         priorityInfo.map((priority) => 
    //             <li className="item" key={priority.id} onClick={() => onChangePriority(priority)}
    //                 style={{ backgroundColor: priority.backgroundColor }}
    //                 label={priority.label}>
    //             </li>
    //         )
    //     }
    // </ul>
    }

    </section>
  );
}
