import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";

export function DynamicCmp({ cmpType, onUpdate, taskToEdit, statusPicker,
    priorityPicker}) {
    let info = {};
    switch (cmpType) {
      case "priority":
        info = {
          selectedPriority: taskToEdit.priority,
          priorities: priorityPicker,
        };
        return <PriorityCmp info={info} onUpdate={onUpdate} />;
      case "status":
        info = {
          selectedStatus: taskToEdit.status,
          statuses: statusPicker,
        };
        return <StatusCmp info={info} onUpdate={onUpdate} />;
      // case "member":
      //     return <MemberPicker info={info} onUpdate={onUpdate} />;
      default:
        return <p>UNKNOWN {cmpType}</p>;
    }
  }
  