import { useState } from "react";

export function TaskPreview({ task }) {

  // const [editMode, setEditMode] = useState(false);
  // const [editedTitle, setEditedTitle] = useState(task.title);

  // const handleToggleEditMode = () => {
  //   setEditMode(!editMode);
  // };

  // const handleInputChange = (e) => {
  //   setEditedTitle(e.target.value);
  // };

  // const handleInputBlur = () => {
  //   // Save changes or handle any necessary logic when the input loses focus
  //   setEditMode(false);
  // };

  return (
    <section className="task-preview">
     
      <div className="task-header">
      <span className="task-txt">{task.title}</span>
      {
      //   editMode ? (
      //   <input
      //     type="text"
      //     value={editedTitle}
      //     onChange={handleInputChange}
      //     onBlur={handleInputBlur}
      //   />
      // ) : (
      //   <span className="task-txt" onClick={handleToggleEditMode}>
      //     {task.title}
      //   </span>
      // )
    }


  
        <div></div>
      </div>

      <span>2</span>
      <span>3</span>
    </section>
  );
}

// <span className="task-txt">{task.title}</span>



// const [editable, setEditable] = useState(true);

// const handleToggleEditable = () => {
//   setEditable(!editable);
// };


// {editable ? (
//   <span
//     className="task-txt"
//     contentEditable={true}
//     onBlur={handleToggleEditable}
//   >
//     {task.title}
//   </span>
// ) : (
//   <span className="task-txt" onClick={handleToggleEditable}>
//     {task.title}
//   </span>
// )}