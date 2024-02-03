import { GroupPreview } from "./GroupPreview.jsx";

export function GroupList({ groups, onSaveTask, onRemoveTask, onRemoveGroup, onUpdateGroup}) {
  // console.log("groups", groups)
  console.log("inload group");
  console.log("groups", groups);
  // console.log('num of tasks', groups[0].tasks.length)

  // if (!groups) return <div>Loading...</div>
  return (
    <ul className="group-list">
      {
          groups.map((group) => (
           <li key={group.id}>
           {console.log(`Group ID: ${group.id}`)}
            <GroupPreview group={group} 
                          onSaveTask={onSaveTask} 
                          onRemoveTask={onRemoveTask} 
                          onRemoveGroup={onRemoveGroup}
                          onUpdateGroup={onUpdateGroup}/>
           </li>
         ))
      }
    </ul>
  );
}

