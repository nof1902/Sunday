import { useEffect, useState } from "react";
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
  getBoardById,
  getEmptyGroup,
  updateBoard,
  updateBoardOptimistic,
} from "../store/actions/board.actions.js";
import { func } from "prop-types";

export function BoardDetails(currBoardTitle) {

  const currBoard = useSelector((storeState) => storeState.boardModule.currBoard);
  const [update,setUpdate] = useState(false)
  const params = useParams()
  
  useEffect(() => {
    if(params.id){
      getBoard()
      setUpdate(false)
    }
  }, [params.id,currBoardTitle,update === true])

  async function getBoard(){
    try {
      await getBoardById(params.id)
      showSuccessMsg(`Group added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not get the wanted board`);
      console.log("error", err);
    }
  }

  async function onSaveGroup(index, group,activity = {}) {
    try {
      console.log('boardDetails ',group)
      const boardToSave = await SaveGroup(currBoard._id, index, group, activity);
      // await updateBoardOptimistic(boardToSave)
      await updateBoard(boardToSave)
      setUpdate(true)
      showSuccessMsg(`Group added successfully`);
    } catch (err) {
      showSuccessMsg(`Could not add Group`);
      console.log("error", err);
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      const boardToSave = await RemoveGroup(currBoard._id, groupId);
      await updateBoard(boardToSave)
      showSuccessMsg(`Group removed successfully`);
    } catch (err) {
      showSuccessMsg(`Could not removed Group`);
      console.log("error", err);
    }
  }

  async function onSaveTask(groupId, task, activity = {}) {
    try {
      const boardToSave = await SaveTask(currBoard._id, groupId, task, activity)
      await updateBoard(boardToSave)
      setUpdate(true)
      // await updateBoardOptimistic(boardToSave)
      showSuccessMsg(`Task added successfully`)
    } catch (err) {
      showErrorMsg(`Could not add task`);
      console.log("error", err);
    }
  }

  async function onRemoveTask(groupId, taskId) {
    try {
      const boardToSave = await RemoveTask(currBoard._id, groupId, taskId);
      // await updateBoardOptimistic(boardToSave)
      await updateBoard(boardToSave)
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
  const { groups , cmpsOrder , statusPicker, priorityPicker, members} = currBoard;

  const handleDragDrop = async (results) => {
    const { source, destination, type } = results
    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return


    if(type === 'group') {
      const reorderdGroups = [...groups]

      const sourceIndex = source.index
      const destinationIndex = destination.index

      const [deletedGroup] = reorderdGroups.splice(sourceIndex, 1)
      reorderdGroups.splice(destinationIndex, 0, deletedGroup)

      return await updateBoardOptimistic({...currBoard, groups: [...reorderdGroups] })
    }

    if (type === 'column') {
      const reorderdColumn = [...cmpsOrder]
  
      const sourceIndex = source.index
      const destinationIndex = destination.index
  
      const [deletedColumn] = reorderdColumn.splice(sourceIndex, 1)
      reorderdColumn.splice(destinationIndex, 0, deletedColumn)

      return await updateBoardOptimistic({...currBoard, cmpsOrder: [...reorderdColumn] })
    }


    if (type === 'task') {

        const sourceIndex = source.index
        const destinationIndex = destination.index
        console.log('sourceIndex', sourceIndex);
        console.log('destinationIndex', destinationIndex);
        
        console.log('source.droppableId', source.droppableId);
        console.log('destination.droppableId', destination.droppableId);
        const groupSourceIndex = groups.findIndex((group) => group.id === source.droppableId)
        const groupDestinationIndex = groups.findIndex((group) => group.id === destination.droppableId)
  
        const newSourceTasks = [...groups[groupSourceIndex].tasks]
        const newDestinationTasks = source.droppableId !== destination.droppableId ? [...groups[groupDestinationIndex].tasks] : newSourceTasks
  
        const [deletedTask] = newSourceTasks.splice(sourceIndex, 1)
        newDestinationTasks.splice(destinationIndex, 0, deletedTask)
  
        const newGroups = [...groups]
        newGroups[groupSourceIndex] = { ...groups[groupSourceIndex], tasks:[...newSourceTasks] }
        newGroups[groupDestinationIndex] = { ...groups[groupDestinationIndex], tasks:[...newDestinationTasks] }
        console.log('newGroups', newGroups);

        return await updateBoardOptimistic({...currBoard, groups: [...newGroups] })
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
          onSaveGroup={onSaveGroup}
          cmpsOrder={cmpsOrder}
          statusPicker={statusPicker}
          priorityPicker={priorityPicker}
          members={members}
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
