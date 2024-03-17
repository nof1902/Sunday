import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";

export function DynamicCmp({ cmpType, onUpdate, taskToEdit, statusPicker,
    priorityPicker}) {

    let info
    function onUpdateEntity(info){
      const choseEntity = Object.values(info)[0]
      onUpdate(cmpType, choseEntity)
    }

    switch (cmpType) {
      case "priority":
        info = {
          selectedPriority: taskToEdit.priority,
          priorities: priorityPicker,
        };
        return <PriorityCmp info={info} onUpdateEntity={onUpdateEntity} />;
      case "status":
        info = {
          selectedStatus: taskToEdit.status,
          statuses: statusPicker,
        };
        return <StatusCmp info={info} onUpdateEntity={onUpdateEntity} />;
      case "timeline":
        info = {
            selectedTimeLine: taskToEdit.timeLine,
        }
          return <TimeLineCmp info={info} onUpdateEntity={onUpdateEntity} />;
      default:
        return <p>UNKNOWN {cmpType}</p>;
    }
  }
  