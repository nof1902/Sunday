import { PeopleCmp } from "./dynamic-iputs/PeopleCmp";
import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";

export function DynamicCmp({ cmpType, onUpdate, taskToEdit, statusPicker, priorityPicker, members, groupStyle, onSaveStatusPicker}) {
    let info
    function onUpdateEntity(info, idxToSave = 0){
      if(info.to){
        onUpdate(cmpType, info)  
        return
      }

      if(idxToSave === 0) {
        console.log('idxToSave === 0');
        const choseEntity = Object.values(info)[0]
        onUpdate(cmpType, choseEntity)
      } else if(idxToSave === 1) {
        console.log('idxToSave === 1');
        const statusPickerToSave = Object.values(info)[1]
        onSaveStatusPicker(statusPickerToSave)
      }

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
        return <TimeLineCmp info={info} onUpdateEntity={onUpdateEntity} groupStyle={groupStyle} />;
      default:
        return <p>UNKNOWN {cmpType}</p>;
    }
  }
  