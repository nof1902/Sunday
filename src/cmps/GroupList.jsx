import { GroupPreview } from "./GroupPreview.jsx";
// import PropTypes from 'prop-types';

export function GroupList({ groups }) {
  console.log("groups", groups);
  return (
    <ul className="group-list">
      {
        //   groups.map((group) => (
        //    <li key={group.id}>
        //    <GroupPreview group={group} />
        //    </li>
        //  ))
      }

      
      <li>
        <GroupPreview group={groups} />
      </li>
    </ul>
  );
}

// GroupList.propTypes = {
//   groups: PropTypes.array.isRequired,
// };
