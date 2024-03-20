import { PriorityCmp } from "./dynamic-iputs/PriorityCmp";
import { StatusCmp } from "./dynamic-iputs/StatusCmp";
import { TimeLineCmp } from "./dynamic-iputs/TimeLineCmp";
import { EntitySummery } from "./summry-dynamic-cmps/EntitySummery";
import { TimeLineSummery } from "./summry-dynamic-cmps/TimeLineSummery";


export function SummeryDynamicCmp({ group, cmpType, statusPicker,priorityPicker}) {

    switch (cmpType) {
      case "priority":
        return <EntitySummery group={group} summeryEntity={cmpType} entityPicker={priorityPicker}/>;
      case "status":
        return <EntitySummery group={group} summeryEntity={cmpType} entityPicker={statusPicker}/>;
      case "timeLine":
          return <TimeLineSummery group={group} />;
      default:
        return <> </>;
    }
  }
  