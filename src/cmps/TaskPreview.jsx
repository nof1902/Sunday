import { useState } from "react";
// import { svgService } from "../svg.service"

export function TaskPreview({ task, deleteTask }) {


  // const addMessageIcon = svgService.getSvg('addMessage')
  //   const addMessageIconUrl = `data:image/svg+xml,${encodeURIComponent(addMessageIcon)}`
    
  // const [showBtn, setShowBtn] = useState(false)
  // const deleteBtn = showBtn?  "delete-btn-show" : "delete-btn-hide"
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (ev) => {
    const val = ev.target.value;
    setEditedTitle(prevTitle => ({ ...prevTitle, title: val }))
    // setEditedTitle(e.target.value);
  };

  const handleInputBlur = () => {
    // Save changes or handle any necessary logic when the input loses focus
    setEditMode(false);
  };

  // const { tasks } = group
  const taskVal = Object.values(task)
  // console.log(taskVal);


//  const { title } = task
  // boardId, groupId, task, activity
  return (
    <section className="task-preview">
      <div className="task-header">
      {/* <button className="delete-btn" onClick={() => onRemoveTask(task)}></button> */}
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_d24b689566 noFocusStyle_07ecef1878" data-testid="icon"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor"></path></svg>
        </button>
        <div className="task-table">
        {editMode ? (
          <input type="text" value={editedTitle} onChange={handleInputChange} onBlur={handleInputBlur} />
        ) : (
          <span className="task-txt" onClick={handleToggleEditMode}>{task.title}</span>
        )

        }
        </div>

        <div className="addMessage-icon">
           <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true" className="icon_4b23d45e02 chat-without-update noFocusStyle_cff5f5a050" data-testid="icon"><path d="M10.4339 1.94996C11.5976 1.94797 12.7458 2.21616 13.7882 2.7334C14.8309 3.25083 15.7393 4.00335 16.4416 4.93167C17.144 5.85999 17.6211 6.93874 17.8355 8.08291C18.0498 9.22707 17.9956 10.4054 17.6769 11.525C17.3583 12.6446 16.7839 13.6749 15.9992 14.5347C15.2145 15.3945 14.2408 16.0604 13.1549 16.4797C12.069 16.8991 10.9005 17.0605 9.7416 16.9513C8.72154 16.8552 7.7334 16.5518 6.83723 16.0612L4.29494 17.2723C3.23222 17.7785 2.12271 16.6692 2.62876 15.6064L3.83948 13.0636C3.26488 12.0144 2.94833 10.8411 2.91898 9.64114C2.88622 8.30169 3.21251 6.97789 3.86399 5.8071C4.51547 4.63631 5.4684 3.66119 6.62389 2.98294C7.77902 2.30491 9.09451 1.94825 10.4339 1.94996ZM10.4339 1.94996C10.4343 1.94996 10.4348 1.94996 10.4352 1.94996L10.4341 2.69996L10.4327 1.94996C10.4331 1.94996 10.4335 1.94996 10.4339 1.94996ZM13.1214 4.07707C12.2868 3.66289 11.3673 3.44821 10.4355 3.44996L10.433 3.44996C9.36086 3.44842 8.30784 3.73382 7.38321 4.27655C6.45858 4.81929 5.69605 5.59958 5.17473 6.53645C4.65341 7.47332 4.39232 8.53263 4.41853 9.60446C4.44475 10.6763 4.75732 11.7216 5.32382 12.6318C5.45888 12.8489 5.47411 13.1197 5.36422 13.3505L4.28601 15.615L6.55002 14.5365C6.78078 14.4266 7.05164 14.4418 7.26869 14.5768C8.05992 15.0689 8.95463 15.3706 9.88231 15.458C10.81 15.5454 11.7453 15.4161 12.6145 15.0805C13.4838 14.7448 14.2631 14.2118 14.8913 13.5236C15.5194 12.8353 15.9791 12.0106 16.2342 11.1144C16.4893 10.2182 16.5327 9.27499 16.3611 8.35913C16.1895 7.44328 15.8076 6.57978 15.2454 5.8367C14.6832 5.09362 13.9561 4.49125 13.1214 4.07707Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M11.25 6.5C11.25 6.08579 10.9142 5.75 10.5 5.75C10.0858 5.75 9.75 6.08579 9.75 6.5V8.75H7.5C7.08579 8.75 6.75 9.08579 6.75 9.5C6.75 9.91421 7.08579 10.25 7.5 10.25H9.75V12.5C9.75 12.9142 10.0858 13.25 10.5 13.25C10.9142 13.25 11.25 12.9142 11.25 12.5V10.25H13.5C13.9142 10.25 14.25 9.91421 14.25 9.5C14.25 9.08579 13.9142 8.75 13.5 8.75H11.25V6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>       
        </div>
      </div>
      {
        taskVal.slice(2).map((Val, idx) => (
          <span key={`${Val}${idx}`}>{Val}</span>
        ))
      }
    </section>
  );
}


// <span className="task-txt">{task.title}</span>
// <span>2</span>
// <span>3</span>


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

