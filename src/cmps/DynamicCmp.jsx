import { PeopleCmp } from "./dynamic-iputs/PeopleCmp";
import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";

export function DynamicCmp({ cmpType, onUpdate, taskToEdit, statusPicker, priorityPicker, members}) {

    let info
    function onUpdateEntity(info){
      if(info.to){
        onUpdate(cmpType, info)  
        return
      }
      const choseEntity = Object.values(info)[0]
      onUpdate(cmpType, choseEntity)
    }

    switch (cmpType) {
      case "people":
        info = {
          selectedUser: taskToEdit.people,
          members: members,
        };
        return <PeopleCmp info={info} onUpdateEntity={onUpdateEntity} />;
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
      case "timeLine":
        info = {
            selectedTimeLine: taskToEdit.timeLine,
        }
        return <TimeLineCmp info={info} onUpdateEntity={onUpdateEntity} />;
      default:
        return <p>UNKNOWN {cmpType}</p>;
    }
  }
  