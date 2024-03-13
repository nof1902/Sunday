import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BoardIndexHeader } from "../cmps/BoardIndexHeader.jsx";
import { GroupList } from "../cmps/GroupList.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import {
  RemoveGroup,
  RemoveTask,
  SaveGroup,
  SaveTask,
  cleanCurrBoard,
  getBoardByID,
  getEmptyGroup,
  updateBoard,
} from "../store/actions/board.actions.js";

export function BoardDetails() {

  const currBoard = useSelector((storeState) => storeState.boardModule.currBoard);
  const params = useParams()
  
  useEffect(() => {
    if(params.id){
      getBoardByID(params.id)
    } else {
      cleanCurrBoard()
    }
  }, [params])

  async function onSaveGroup(index, group, activity) {
    try {
      const updatedBoard = await SaveGroup(currBoard._id, index, group, activity);
      // onUpdateBoard(updatedBoard)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      const updatedBoard = await RemoveGroup(currBoard._id, groupId);
      // onUpdateBoard(updatedBoard)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateGroup(group, activity) {
    try {
      const updatedBoard = await SaveGroup(currBoard._id, null, group, activity)
      // onUpdateBoard(updatedBoard)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onSaveTask(groupId, task, activity = {}) {
    try {
      
      const updatedBoard = await SaveTask(currBoard._id, groupId, task, activity)
      // onUpdateBoard(updatedBoard)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveTask(groupId, taskId) {
    try {
      const updatedBoard = await RemoveTask(currBoard._id, groupId, taskId);
      // onUpdateBoard(updatedBoard)
      showSuccessMsg(`Task added successfully`);
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onUpdateBoard(boardToSave) {
    try {
        await updateBoard(boardToSave)
        showSuccessMsg(`board updated`)
    } catch (err) {
        showErrorMsg('Cannot update board')
        console.log('error',err)
    }
  }

  if (!currBoard) return <div>Loading...</div>;
  const { groups , cmpsOrder , statusPicker, priorityPicker} = currBoard;

  const handleDragDrop = async (results) => {
    const { source, destination, type } = results
    // console.log(results)
    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return


    if(type === 'group') {
      // console.log('group')
      const reorderdGroups = [...groups]

      const sourceIndex = source.index
      const destinationIndex = destination.index

      const [deletedGroup] = reorderdGroups.splice(sourceIndex, 1)
      reorderdGroups.splice(destinationIndex, 0, deletedGroup)

      // SetGroups(reorderdGroups)
      
      // currBoard.groups = [...reorderdGroups]
      // console.log('currBoard', currBoard);
      // await onUpdateBoard(currBoard)
      return onUpdateBoard({...currBoard, groups: [...reorderdGroups] })
    }

    if (type === 'column') {
      // console.log('column')
      const reorderdColumn = [...cmpsOrder]
  
      const sourceIndex = source.index
      const destinationIndex = destination.index
  
      const [deletedColumn] = reorderdColumn.splice(sourceIndex, 1)
      reorderdColumn.splice(destinationIndex, 0, deletedColumn)
  
      // currBoard.cmpsOrder = [...reorderdColumn]
      // await onUpdateBoard(currBoard)
      return onUpdateBoard({...currBoard, cmpsOrder: [...reorderdColumn] })
      // return setColumnOrder(reorderdColumn)
    }


    if (type === 'task') {
      // console.log('task')

        const sourceIndex = source.index
        const destinationIndex = destination.index
  
        const groupSourceIndex = groups.findIndex((group) => group.id === source.droppableId)
        const groupDestinationIndex = groups.findIndex((group) => group.id === destination.droppableId)
  
        const newSourceTasks = [...groups[groupSourceIndex].tasks]
        const newDestinationTasks = source.droppableId !== destination.droppableId ? [...groups[groupDestinationIndex].tasks] : newSourceTasks
  
        const [deletedTask] = newSourceTasks.splice(sourceIndex, 1)
        newDestinationTasks.splice(destinationIndex, 0, deletedTask)
  
        const newGroups = [...groups]
        newGroups[groupSourceIndex] = { ...groups[groupSourceIndex], tasks:[...newSourceTasks] }
        newGroups[groupDestinationIndex] = { ...groups[groupDestinationIndex], tasks:[...newDestinationTasks] }

        //  currBoard.groups = [...newGroups]     
        //  await onUpdateBoard(currBoard)
  
        // SetGroups(newGroups)
        return onUpdateBoard({...currBoard, groups: [...newGroups] })
      }

  }


  return (
    <section className="board-details">
      <DragDropContext onDragEnd={handleDragDrop}>
        <BoardIndexHeader
          board={currBoard}
          onSaveTask={onSaveTask}
          onSaveGroup={onSaveGroup}
          onUpdateBoard={onUpdateBoard}
          cmpsOrder={cmpsOrder}
        />
      <Droppable droppableId="GROUP" type="group">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <GroupList
          groups={groups}
          onSaveTask={onSaveTask}
          onRemoveTask={onRemoveTask}
          onRemoveGroup={onRemoveGroup}
          onUpdateGroup={onUpdateGroup}
          cmpsOrder={cmpsOrder}
          statusPicker={statusPicker}
          priorityPicker={priorityPicker}
        />
        {provided.placeholder}
        </div>
      )}
      </Droppable>

        <button
          className="new-group-btn"
          onClick={() =>
            onSaveGroup(currBoard.groups.length, getEmptyGroup(), {})
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="#323338"
            width="24"
          >
            <path d="M11.3 18.6v-5.9H5.4v-1.4h5.9V5.4h1.4v5.9h5.9v1.4h-5.9v5.9Z"></path>
          </svg>
          Add new group
        </button>
        </DragDropContext>
    </section>
  );
}
