import { GroupPreview } from "./GroupPreview.jsx";

export function GroupList({ groups, onSaveTask, onRemoveTask, onRemoveGroup}) {
  // console.log("groups", groups)

  // console.log('num of tasks', groups[0].tasks.length)
  return (
    <ul className="group-list">
      {
          groups.map((group) => (
           <li key={group.id}>
            <GroupPreview group={group} onSaveTask={onSaveTask} onRemoveTask={onRemoveTask} onRemoveGroup={onRemoveGroup}/>
           </li>
         ))
      }
    </ul>
  );
}

