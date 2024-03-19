import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";
import { EntitySummery } from "./summry-dynamic-cmps/EntitySummery";


export function SummeryDynamicCmp({ group, cmpType, statusPicker,priorityPicker}) {

    switch (cmpType) {
      case "priority":
        return <EntitySummery group={group} summeryEntity={cmpType} entityPicker={priorityPicker}/>;
      case "status":
        return <EntitySummery group={group} summeryEntity={cmpType} entityPicker={statusPicker}/>;
    // case "timeLine":
    //     info = {
    //         selectedTimeLine: taskToEdit.timeLine,
    //     }
    //     return <TimeLineCmp info={info} onUpdateEntity={onUpdateEntity} />;
      default:
        return <> </>;
    }
  }
  