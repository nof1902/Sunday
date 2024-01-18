import { GroupPreview } from "./GroupPreview.jsx";

export function GroupList({ groups }) {
  // console.log("groups", groups)
  return (
    <ul className="group-list">
      {
          groups.map((group) => (
           <li key={group.id}>
           <GroupPreview group={group} />
           </li>
         ))
      }
    </ul>
  );
}

