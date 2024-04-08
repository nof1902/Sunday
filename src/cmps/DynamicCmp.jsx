import { PeopleCmp } from "./dynamic-iputs/PeopleCmp";
import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";

export function DynamicCmp({ cmpType, onUpdate, taskToEdit, statusPicker, priorityPicker, members, groupStyle, onSaveCmpEdit}) {
    let info
    
    function onUpdateEntity(info, cmpNameToSave = null){
      if(info?.to){
        onUpdate(cmpType, info)  
        return
      }

      if(cmpNameToSave != null){
        //save statuses array - stasusPicker
        const cmpPickerToSave = Object.values(info)[1]
        onSaveCmpEdit(cmpNameToSave, cmpPickerToSave)
      } else {
        //save the selectes value
        const choseEntity = Object.values(info)[0]
        onUpdate(cmpType, choseEntity)
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
  