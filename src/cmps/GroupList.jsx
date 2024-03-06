import { GroupPreview } from "./GroupPreview.jsx";

export function GroupList({ groups, onSaveTask, onRemoveTask, onRemoveGroup, onUpdateGroup, cmpsOrder}) {
  // if (!groups) return <div>Loading...</div>
  return (
    <ul className="group-list">
      {
          groups.map((group) => (
           <li key={group.id}>
            <GroupPreview group={group} 
                          onSaveTask={onSaveTask} 
                          onRemoveTask={onRemoveTask} 
                          onRemoveGroup={onRemoveGroup}
                          onUpdateGroup={onUpdateGroup}
                          cmpsOrder={cmpsOrder} />
           </li>
         ))
      }
    </ul>
  );
}

