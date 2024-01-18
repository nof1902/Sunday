import { GroupPreview } from "./GroupPreview.jsx";

export function GroupList({ boards }) {

    return (
           <ul className='group-preview'>
           {boards.map((board) => (
             <li key={board._id}>
             <GroupPreview board={board} />
             </li>
           ))}
         </ul>
    )
}
