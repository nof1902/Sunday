import { GroupPreview } from "./GroupPreview.jsx";
import { Draggable } from "react-beautiful-dnd"

export function GroupList({
  groups,
  onSaveTask,
  onRemoveTask,
  onRemoveGroup,
  onSaveGroup,
  cmpsOrder,
  statusPicker,
  priorityPicker
}) {
  // if (!groups) return <div>Loading...</div>
  return (
    <ul className="group-list">
      {groups.map((group, idx) => (
        <Draggable draggableId={group.id} key={group.id} index={idx} >
        {(provided) => (
          <li key={group.id} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <GroupPreview
            group={group}
            onSaveTask={onSaveTask}
            onRemoveTask={onRemoveTask}
            onRemoveGroup={onRemoveGroup}
            onSaveGroup={onSaveGroup}
            cmpsOrder={cmpsOrder}
            statusPicker={statusPicker}
            priorityPicker={priorityPicker}
          />
        </li>
        )}
        </Draggable>
      ))}
    </ul>
  );
}
