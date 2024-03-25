import { useEffect, useRef, useState } from "react";
import { TaskList } from "./TaskList.jsx";
import { getEmptyTask } from "../store/actions/board.actions.js";
// import { useParams } from "react-router";
import { utilService } from "../services/util.service";
import { MdOutlineExpandMore } from "react-icons/md";
import { func } from "prop-types";
// import { useDebounce } from "../customHooks/useDebounce.js";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";
import { Droppable, Draggable } from "react-beautiful-dnd"
import { OptionsActionsCmp } from "./OptionsActionsCmp.jsx";
import { SummeryDynamicCmp } from "./SummeryDynamicCmp.jsx";

export function GroupPreview({
  group,
  onSaveTask,
  onRemoveTask,
  onRemoveGroup,
  onSaveGroup,
  cmpsOrder,
  statusPicker,
  priorityPicker,
  members,
  onSaveStatusPicker
}) {
  // const param = useParams();

  const [task, setTask] = useState(createEmptyTask());
  const [currGroup, setCurrGroup] = useState(group);
  // const debouncedGroup = useDebounce(currGroup);
  const [inputFocused, setInputFocused] = useState(null);
  const [isTitleGroupEditMode, setIsTitleGroupEditMode] = useState(null);

  // open actions window
  const [isOptionsModalOpen,setIsOptionsModalOpen] = useState(false)
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const [openColorModel, setOpenColorModel] = useState(false);

  const inputBlueTitle = isTitleGroupEditMode ? "blue-input" : "";


  useEffect(() => {
    if (inputFocused === false) {
      setInputFocused(null);
      saveTaskCall(task)
      setTask(getEmptyTask());
    }
  }, [inputFocused]);

  useEffectUpdate(() => {
    async function saveGroup(){
      await onSaveGroup(null,currGroup);
    }
    saveGroup()
  }, [currGroup]);

  function createEmptyTask() {
    const newTask = getEmptyTask();
    cmpsOrder.forEach((component) => {

      if(newTask[component] === 'timeLine'){
        newTask[component] ={};
      }

      else{
        newTask[component] = ''
      }
    });

    return newTask;
  }

  function handleGroupPreview() {
    setIsGroupOpen(!isGroupOpen)
  }

  function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      if (ev.target.id === "newTask"){
        setInputFocused(false);
        ev.target.value = "";
      }
      else {
        setIsTitleGroupEditMode(false);
      }  
    }
  }

  async function handleGroupTitleBlur(ev) {
    ev.stopPropagation()
    if (ev.target.value !== "") {
      setIsTitleGroupEditMode(false);
    } 
    // onSaveGroup(null,currGroup);
  }

  function handleGroupTitleChange({ target }) {
    const { name: field, value } = target;
    setCurrGroup((prevGroup) => ({ ...prevGroup, [field]: value }));
  }

  async function handleTaskInputBlur({ target }) {
    if (target.value !== "") setInputFocused(false);
    target.value = "";
  }

  function handleTaskInputFocus() {
    setInputFocused(true);
  }

  async function saveTaskCall(taskToSave) {
    await onSaveTask(currGroup.id, taskToSave);
    const isTaskExist = currGroup.tasks.find((task) => task.id === taskToSave.id)
    
    if(isTaskExist){
      setCurrGroup((prevGroup) => ({
        ...prevGroup,
        tasks: prevGroup.tasks.map((task) => 
        task.id === taskToSave.id ? { ...task, ...taskToSave } : task
        ),
      }));      
    } else {
      setCurrGroup((prevGroup) => ({
        ...prevGroup,
        tasks: [...prevGroup.tasks, taskToSave],
      }));
    }

    onSaveGroup(null,currGroup);
  }

  function handleTaskChange({ target }) {
    const { name: field, value } = target;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
    console.log('task', task);
  }

  async function deleteTask(taskId) {
    onRemoveTask(group.id, taskId);
    setCurrGroup((prevGroup) => ({
      ...prevGroup,
      tasks: prevGroup.tasks.filter((task) => 
      task.id !== taskId
      ),
    }))
    onSaveGroup(null,currGroup);
  }

  function handleSetModal() {
    setIsOptionsModalOpen(!isOptionsModalOpen)
  }
  
  // //open color model
  // function handleOpenColorModel() {
  //   setOpenColorModel(!openColorModel)
  // }

  function onChangeColor(rgbColor) {
    setOpenColorModel(!openColorModel)
    setCurrGroup((prevGroup) => ({ ...prevGroup, style: rgbColor }));
  }

  const { tasks } = group;

  return (
    <>
    { isGroupOpen && 
      <section className="group-preview">
      <section className="group-header">
        <button className="delete-btn" onClick={handleSetModal}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_d24b689566 noFocusStyle_07ecef1878" data-testid="icon" >
            <path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" ></path>
          </svg>
        </button>
        {isOptionsModalOpen && <OptionsActionsCmp onAction={onRemoveGroup} onActionProps={group.id} handleSetModal={handleSetModal} actionType={'removeGroup'}/>}
        <div className="expansion-btn" onClick={handleGroupPreview}>
        <svg viewBox="0 0 20 20" color={group.style}  fill="currentColor" width="22" height="24" role="button" tabIndex="0" aria-hidden="false"
          className="icon_4b23d45e02 collapsible-icon clickable_f2c35f1e3f" data-testid="icon" >
          <path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
        </div>
        
        {isTitleGroupEditMode ? (
          <div className={`group-title-div ${inputBlueTitle}`}>
          <div className="group-color-div" style={{ backgroundColor: `${group.style}` }} onClick={() => setOpenColorModel(true)}></div>
          <input
            className="group-title-input"
            autoFocus
            style={{ color: group.style }}
            name="title"
            type="text"
            id="edit-group-title"
            value={currGroup.title}
            onChange={handleGroupTitleChange}
            onBlur={handleGroupTitleBlur}
            onKeyDown={handleKeyDown}
          />
          { openColorModel && 
            <div className="model-change-color">
            { utilService.bringColor().map((rgbColor, idx) => (
                <div key={idx} onClick={() => onChangeColor(rgbColor)} style={{ backgroundColor: rgbColor }}></div>
              ))}
            </div>
          }
          </div>
        ) : (
            <h3
            className="group-title-h3"
            onClick={() => setIsTitleGroupEditMode(true)}
            style={{ color: group.style }}
          >
            {group.title}
          </h3>
        
        )}
      </section>
      <section
        className="tasks-table"
        style={{ borderInlineStart: `6px solid ${group.style}` }}
      >

      <Droppable direction="horizontal" droppableId="COLUMN" type="column">
      {(provided) => (
        <section className="tasks-header" {...provided.droppableProps} ref={provided.innerRef}>
          <div>
            <h4>Task</h4>
          </div>
          <div className="group-column-div">
          {cmpsOrder.map((key, idx) => (
            <Draggable draggableId={`${key}${idx}`} key={idx} index={idx}>
            {(provided) => (
              <h4 key={`${key}${idx}`} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>{key}</h4>
            )}
            </Draggable>
          ))}
          {provided.placeholder}
          </div>
          
          <div>
            <div className="add-column-btn">
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" role="button" tabIndex="0" aria-hidden="false" className="icon_582a7de6be add-column-menu-button__icon clickable_404a1f116c" data-testid="icon"><path d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </div>
          </div>
        </section>
      )}
      </Droppable>

      <Droppable droppableId={group.id} type="task">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            saveTaskCall={saveTaskCall}
            cmpsOrder={cmpsOrder}
            statusPicker={statusPicker}
            priorityPicker={priorityPicker}
            members={members}
            groupStyle={group.style}
            onSaveStatusPicker={onSaveStatusPicker}
          />
          {provided.placeholder}
        </div>
      )}
      </Droppable>
         
    </section>
      <section className="group-footer">
        <div
          className="footer-new-task"
          style={{
            borderInlineStart: `6px solid ${utilService.getColorAlfa(group.style)}`
          }}
        >
        <div className="footer-div-input">
        <label htmlFor="newTask" hidden>
            add new task
          </label>
          <input
            className="new-input"
            id="newTask"
            name="title"
            type="text"
            placeholder="+ Add task"
            onChange={handleTaskChange}
            onBlur={handleTaskInputBlur}
            onFocus={handleTaskInputFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
          <div></div>
        </div>
        {
          <section className="footer-stasus">
            <div></div>
            <div className="footer-summary">
            {cmpsOrder.map((item, idx) => (
              <span key={idx}>
                <SummeryDynamicCmp group={group} cmpType={item} statusPicker={statusPicker} priorityPicker={priorityPicker}/>
              </span>
            ))}
            </div>
            <div></div>
            
          </section>
        }
      </section>
    </section>
    }
    

    { !isGroupOpen && 
    <section className="group-unpreview" style={{ borderInlineStart: `6px solid ${group.style}` }}>  
      <section className="task-header-unpreview">
      
      <div className="task-title">
        <div className="expansion-btn" onClick={handleGroupPreview}>
          <svg viewBox="0 0 20 20" color={group.style} fill="currentColor" width="22" height="24" role="button" tabIndex="0" aria-hidden="false"
            className="icon_4b23d45e02 collapsible-icon clickable_f2c35f1e3f" data-testid="icon" >
            <path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
          </div>

          {isTitleGroupEditMode ? (
              <div className={`group-title-div ${inputBlueTitle}`}>
              <div className="group-color-div" style={{ backgroundColor: `${group.style}` }} onClick={() => setOpenColorModel(true)}></div>
              <input
                className="group-title-input"
                autoFocus
                style={{ color: group.style }}
                name="title"
                type="text"
                id="edit-group-title-unpreview"
                value={currGroup.title}
                onChange={handleGroupTitleChange}
                onBlur={handleGroupTitleBlur}
                onKeyDown={handleKeyDown}
              />
              { openColorModel && 
                <div className="model-change-color">
                { utilService.bringColor().map((rgbColor, idx) => (
                    <div key={idx} onClick={() => onChangeColor(rgbColor)} style={{ backgroundColor: rgbColor }}></div>
                  ))}
                </div>
              }
              </div>
            ) : (
              <h3 onClick={() => setIsTitleGroupEditMode(true)}style={{ color: group.style }} >
              {group.title}
            </h3>  
            )}

        </div>
      
        <span>{tasks.length} Task</span>
      </section>
      
      <div className="group-column-div">
      {cmpsOrder.map((key, idx) => (
        <div key={`${key}${idx}`}>
          <h4>{key}</h4>
          <div className="summery-div">
            <SummeryDynamicCmp group={group} cmpType={key} statusPicker={statusPicker} priorityPicker={priorityPicker}/>
          </div>
        </div>
      ))}
      </div>
    </section>
    }

    
    </>
  );
}
