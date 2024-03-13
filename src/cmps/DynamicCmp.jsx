import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";

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
      case "timeline":
        info = {
            selectedTimeLine: taskToEdit.timeLine,
        }
          return <TimeLineCmp info={info} onUpdate={onUpdate} />;
      default:
        return <p>UNKNOWN {cmpType}</p>;
    }
  }
  